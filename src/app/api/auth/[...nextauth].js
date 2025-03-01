import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            // Add custom session logic if needed
            return session;
        },
    },
});
