import KeycloakProvider from "next-auth/providers/keycloak";
import { NextAuthOptions } from "next-auth";

export const authConfig: NextAuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID as string,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
            issuer: process.env.AUTH_ISSUER as string,
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
            }
            return token
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken as string
            session.user.id = token.id as string

            return session
        }
    },
}