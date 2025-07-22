import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import { id } from "zod/locales";
import { any } from "zod";


export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try{
          const user = await UserModal.findOne({
            $or:[
              {email: credentials.identifier},
              {username: credentials.identifier}
            ]
          })

          if(!user){
            throw new Error("No user found with the given credentials");
          }

          if(!user.isVerified){
            throw new Error("Please verify your account before logging in");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if(isPasswordCorrect){
            return user;
          } else {
            throw new Error("Incorrect password");
          }

        } catch (err: any){
          throw new Error(err);
        }
        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if(token){
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if(user){
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token
    }
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};