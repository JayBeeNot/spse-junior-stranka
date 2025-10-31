import React, { useState } from 'react';
import { Button } from './ui-js/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui-js/card';
import { Input } from './ui-js/input';
import { Label } from './ui-js/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ArrowLeft, Trophy } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function LoginPage({ onLogin, onNavigateToRegister, onNavigateToHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = onLogin(email, password, role);
    if (success) {
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials or role mismatch');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <Button className="border border-blue-200 text-blue-700 hover:bg-blue-50" onClick={onNavigateToHome}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2 ml-auto">
            <Trophy className="h-8 w-8 text-blue-600" />
            <h1 className="text-blue-900">School Competitions Board</h1>
          </div>
        </div>
      </header>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Sign in to access the competitions board
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Login as</Label>
                <Select value={role} onValueChange={(value) => setRole(value)}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Demo credentials info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-900 mb-2">Demo Credentials:</p>
                <p className="text-blue-700">Admin: admin@school.edu</p>
                <p className="text-blue-700">Password: (any)</p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                Login
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="text-blue-600 hover:underline"
                >
                  Don't have an account? Register as a student
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
