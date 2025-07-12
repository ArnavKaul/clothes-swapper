import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(''); 
    let response = await axios.post("http://localhost:8080/login", {
      username: email,
      password: password,
    }, {
      withCredentials: true, 
    });   
      if (response.data.success) {
      console.log("Login successful:", response.data);
    } else {
      setError(response.data.message || "Login failed"); }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">Enter your username and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center">
            Don't have an account?{' '}
            <a href="#" className="underline">
              Register
            </a>
          </div>
          {/* You could add social login buttons here */}
          {/* <Button variant="outline" className="w-full">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.848-8.804c1.452-.002 2.923.367 4.316 1.056l-.11 1.776c-1.39-2.029-3.793-2.924-6.31-2.918-3.414 0-6.023 2.502-6.023 5.922 0 3.518 2.55 5.918 6.023 5.918 2.624 0 4.298-1.125 5.09-2.585.578-.97.942-2.128.942-3.416 0-.828-.063-1.63-.18-2.39h-6.853v-2.001h8.924c.058.293.088.59.088.895 0 1.773-.59 4.196-2.58 6.326C13.88 17.653 11.332 18.083 8.842 18.083Z" clipRule="evenodd"/>
            </svg>
            Login with Google
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}