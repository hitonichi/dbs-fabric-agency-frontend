import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MOCK_USER } from '../../../../data/users';

export type Roles = string[];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'johnSmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log('[INFO] logging in as ', credentials, req);

        const user = MOCK_USER.find(
          (u) => u.username === credentials?.username
        );

        if (user && user.password === credentials.password) {
          console.log('correct user', user);
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.roles = user.roles;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.roles = token.roles as Roles;
      return session;
    },
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
