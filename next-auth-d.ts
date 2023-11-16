import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** Oauth access token */
    accessToken?: string;
    campuses: Array<string>;
    user: {
        id: string;
        campuses: Array<string>;
    } & DefaultSession["user"];
  }
  
  interface Profile {
    campus: Array<string>;
  }
}