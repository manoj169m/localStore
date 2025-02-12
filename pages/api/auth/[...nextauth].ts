import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user']
  }

  interface User {
    id: string;
    role: string;
    email: string;
    name: string;
  }
}

// Extend the built-in JWT types
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<any> {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Missing credentials');
          }

          const adminUsername = process.env.ADMIN_USERNAME;
          const adminPassword = process.env.ADMIN_PASSWORD;

          if (!adminUsername || !adminPassword) {
            console.error('Environment variables not properly configured');
            throw new Error('Server configuration error');
          }

          if (
            credentials.username === adminUsername &&
            credentials.password === adminPassword
          ) {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@example.com',
              role: 'admin',
            };
          }

          return null;
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication error');
        }
      },
    }),
  ],
  pages: {
    signIn: '/signup',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);