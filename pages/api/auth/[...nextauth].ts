import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials) {
        console.log('Credentials received:', credentials);
        if (credentials?.username === process.env.ADMIN_USERNAME && credentials?.password === process.env.ADMIN_PASSWORD) {
          console.log('Authentication successful');
          return { id: 'admin', name: 'Admin' };
        }
        console.log('Authentication failed');
        return null;
      },      
    }),
  ],
  pages: {
    signIn: '/signup',
  },
});
