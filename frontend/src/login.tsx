import { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, LogIn, Eye, EyeOff } from 'lucide-react';

type RegisterProps = {
  setUsername: (username: string) => void;
};

export default function LoginPage({ setUsername }: RegisterProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both username and password.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        {
          username: email,
          password: password,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log('Login successful:', response.data);
        setUsername(response.data.user.username); 
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Username or password wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 p-4 w-full m-0" style={{margin: 0, padding: '1rem'}}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-400 rounded-lg flex items-center justify-center">
              <LogIn className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-2xl font-bold text-cyan-400">Clothes Swapper</h1>
          </div>
          <p className="text-neutral-400">Welcome back to the community</p>
        </div>

        <Card className="bg-neutral-900 border border-neutral-800 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-cyan-400">Login</CardTitle>
            <CardDescription className="text-center text-neutral-300">
              Enter your username and password to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-neutral-300">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:ring-cyan-400 focus:border-cyan-400"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-neutral-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400 focus:ring-cyan-400 focus:border-cyan-400 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <Button 
                type="submit"
                className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-semibold transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center text-neutral-400">
              Don't have an account?{' '}
              <a href="#" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                Register here
              </a>
            </div>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">
            By signing in, you agree to our{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-cyan-400 text-black p-4 rounded-full shadow-lg hover:bg-cyan-500 transition-all cursor-pointer hover:scale-110">
          <LogIn className="w-6 h-6" />
        </div>
      </div>

      {/* Floating Navigation */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-neutral-800 border border-neutral-700 rounded-full px-4 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-cyan-400 text-sm font-medium">Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}