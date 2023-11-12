import nextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
        const user = {
          id: '1',
          username: 'john',
          password: '123',
          name: 'J Smith',
          email: 'jsmith@example.com',
        };

        if (
          credentials?.username === user.username &&
          credentials.password === user.password
        ) {
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
  // pages: {

  // }
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
