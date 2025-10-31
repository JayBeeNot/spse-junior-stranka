import React, { useState } from 'react';
import { Button } from './ui-js/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui-js/card';
import { Input } from './ui-js/input';
import { Label } from './ui-js/label';
import { ArrowLeft, Trophy } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function RegisterPage({ onRegister, onNavigateToLogin, onNavigateToHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !teamName) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const success = onRegister(email, password, teamName);
    if (success) {
      toast.success('Registration successful! Welcome to the competitions board.');
    } else {
      toast.error('Email already registered. Please use a different email.');
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

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Register as Student</CardTitle>
            <CardDescription>
              Create your account and team to participate in competitions
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name</Label>
                <Input
                  id="teamName"
                  type="text"
                  placeholder="Enter your team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
                <p className="text-gray-500">Choose a unique name for your team</p>
              </div>
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
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
                Register
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="text-blue-600 hover:underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
