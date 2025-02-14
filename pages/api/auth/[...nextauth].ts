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

        // Check if credentials are provided
        if (credentials?.username === userData.username) {
          const isMatch = credentials.password === userData.password;

          if (isMatch) {
            // Return userData, but make sure it matches the User type
            return {
              id: userData.id,
              username: userData.username,
              email: userData.email,  // You should include any relevant user properties
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
  pages: {
    signIn: '/signup', // Make sure this is the correct path for your sign-up page
  },
});
