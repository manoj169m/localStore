'use client';
import { signIn } from 'next-auth/react';

const Login = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      alert('Invalid credentials');
    } else {
      window.location.href = '/signup/dashboard';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
