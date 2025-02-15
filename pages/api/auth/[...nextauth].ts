import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { userData } from '@/data/user';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Credentials received:', credentials);

        if (credentials?.username === userData.username) {
          const isMatch = credentials.password === userData.password;

          if (isMatch) {
            // Return userData, include any relevant user properties
            return {
              id: userData.id,
              username: userData.username,
              email: userData.email,
            };
          } else {
            throw new Error('Incorrect password');
          }
        } else {
          throw new Error('User not found');
        }
      },
    }),
  ],
  session: {
    maxAge: 24 * 60 * 60, // Session duration (24 hours)
    strategy: 'jwt', // Ensure using database-based session management if you have a database
  },
  pages: {
    signIn: '/signup', // Make sure this is the correct path for your sign-up page
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set in your environment variables
});
