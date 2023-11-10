import { KeycloakSignInButton } from "./keycloak-signin-button";
import { SignOutButton } from "./signout-button";
import { getServerSession } from "next-auth/next";

export const Navigation = async () => {
    const session = await getServerSession()

    if (session) return <SignOutButton />

    return <KeycloakSignInButton />
}