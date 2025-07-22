import NextAuth from "next-auth";

declare module "next-auth" {
  interface user {
    _id?: string;
    isVerified?: boolean;
    isacceptingMessages?: boolean;
    username?: string;

  }
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}
