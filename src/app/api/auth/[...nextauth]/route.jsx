import NextAuth from "next-auth";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import connectDB from "@/db/connectDB";
import bcrypt from "bcryptjs";

export const Authoptions = NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        let user = await User.findOne({ email: credentials.email });

        if (!user) {
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          user = new User({
            name: credentials.email.split("@")[0],
            email: credentials.email,
            username: credentials.email.split("@")[0],
            password: hashedPassword,
          });

          await user.save();
        } else {
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }
        }
        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXT_AUTH_SECRET,
  },
  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        const currentUser = await User.findOne({ email: user.email });

        const password = Math.random().toString(36).slice(-8);

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!currentUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            username: user.email.split("@")[0],
            password: hashedPassword,
          });

          await newUser.save();
        }

        return true;
      } catch (error) {
        console.error("Error during signIn:", error);
        return false;
      }
    },

    async session({ session,token }) {
      try {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });

        if (user) {
          token.username = user.username;
          session.user.name = user.name;
          session.user.username = user.username;
        } else {
          return null;
        }
        return session;
      } catch (error) {
        console.error("Error during session:", error);
        return session;
      }
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});

export { Authoptions as GET, Authoptions as POST };
