import type { JWT } from 'next-auth/jwt';
import KeycloakProvider from "next-auth/providers/keycloak";
import { NextAuthOptions } from "next-auth";

const refreshAccessToken = async (token: JWT, realmURL: string) => {
    try {
        if (Date.now() > token.refreshTokenExpired) throw Error;
        const details = {
            client_id: process.env.KEYCLOAK_CLIENT_ID as string,
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
            grant_type: ['refresh_token'],
            refresh_token: token.refreshToken,
        };
        const formBody: string[] = [];
        Object.entries(details).forEach(([key, value]: [string, any]) => {
            const encodedKey = encodeURIComponent(key);
            const encodedValue = encodeURIComponent(value);
            formBody.push(encodedKey + '=' + encodedValue);
        });
        const formData = formBody.join('&');
        const url = realmURL + process.env.KEYCLOAK_AUTH_TOKEN_PATH as string
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formData,
        });
        const refreshedTokens = await response.json();
        if (!response.ok) throw refreshedTokens;
        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpired: Date.now() + (refreshedTokens.expires_in - 15) * 1000,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
            refreshTokenExpired:
                Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
        };
    } catch (error) {
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
};

export const authConfig: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            id: "keycloak-staff",
            name: "Keycloak Staff",
            clientId: process.env.KEYCLOAK_CLIENT_ID as string,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
            issuer: process.env.STAFF_AUTH_ISSUER as string,
            requestTokenUrl: process.env.STAFF_AUTH_ISSUER as string + process.env.KEYCLOAK_AUTH_TOKEN_PATH as string,
        }),
        KeycloakProvider({
            id: "keycloak-students",
            name: "Keycloak Students",
            clientId: process.env.KEYCLOAK_CLIENT_ID as string,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
            issuer: process.env.STUDENTS_AUTH_ISSUER as string,
            requestTokenUrl: process.env.STUDENTS_AUTH_ISSUER as string + process.env.KEYCLOAK_AUTH_TOKEN_PATH as string,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, account, user, profile }) {
            if (profile) {
                token.campuses = profile.campus
                token.iss = profile.iss
            }
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
                token.refreshToken = account.refresh_token;
                token.refreshTokenExpired = Date.now() + account.refresh_expires_in * 1000;

                if (account.expires_at) {
                    token.accessTokenExpired = account.expires_at * 1000;
                }
            }

            if (Date.now() < token.accessTokenExpired) {
                return token;
            }

            const realmURL = token.iss
            return refreshAccessToken(token, realmURL);
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken as string
            session.user.id = token.id as string
            session.campuses = token.campuses as Array<string>
            return session
        }
    },
}
