import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';


};

export function RegisterPage({ setCurrentPage }) {
  const context = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  if (!context) return null;
  const { register } = context;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Heslá sa nezhodujú');
      return;
    }

    if (password.length < 6) {
      setError('Heslo musí mať aspoň 6 znakov');
      return;
    }

    const success = register(email, password, name);
    if (!success) {
      setError('Email je už registrovaný');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Card className="w-full max-w-md shadow-2xl border-2 border-gray-100">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Registrácia</CardTitle>
          
            Vytvor si študentský účet pre účasť v súťažiach
          </CardDescription>
        </CardHeader>
        
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                {error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Celé meno</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ján Novák"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-2"
              />
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Potvrď heslo</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Potvrď svoje heslo"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-2"
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover
              Registrovať
            </Button>

            <div className="text-center text-sm text-gray-600">
              Už máš účet?{' '}
              <button
                type="button"
                onClick={() => setCurrentPage('login')}
                className="text-purple-600 hover
              >
                Prihlás sa tu
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
