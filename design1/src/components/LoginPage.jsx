import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';


};

export function LoginPage({ setCurrentPage }) {
  const context = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!context) return null;
  const { login } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const success = login(email, password);
    if (!success) {
      setError('Nesprávny email alebo heslo');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Card className="w-full max-w-md shadow-2xl border-2 border-gray-100">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Prihlásenie</CardTitle>
          
            Prihlás sa do svojho účtu pre pokračovanie
          </CardDescription>
        </CardHeader>
        
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                {error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@skola.sk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Heslo</Label>
              <Input
                id="password"
                type="password"
                placeholder="Zadaj svoje heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover
              Prihlásiť sa
            </Button>

            <div className="text-center text-sm text-gray-600">
              Nemáš účet?{' '}
              <button
                type="button"
                onClick={() => setCurrentPage('register')}
                className="text-blue-600 hover
              >
                Registruj sa tu
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg text-sm space-y-2 border border-gray-200">
              <p className="text-gray-700">Demo účty
              <p className="text-gray-600">
                Študent:</strong> student@school.edu / student123
              </p>
              <p className="text-gray-600">
                Admin:</strong> admin@school.edu / admin123
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
