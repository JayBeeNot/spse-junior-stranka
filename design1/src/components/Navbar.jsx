import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Button } from './ui/button';
import { LogOut, User, Home } from 'lucide-react';


  setCurrentPage: (page) => void;
};

export function Navbar({ currentPage, setCurrentPage }) {
  const context = useContext(AppContext);
  if (!context) return null;

  const { user, logout } = context;

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  return (
    <nav className="bg-white border-b-2 border-gray-100 sticky top-0 z-50 shadow-sm backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 group"
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg group-hover
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-900 group-hover:text-blue-600 transition-colors">Súťažná platforma</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                  <User className="h-5 w-5" />
                  {user.name}</span>
                  <span className="px-2.5 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm">
                    {user.role === 'admin' ? 'admin' : 'študent'}
                  </span>
                </div>
                <Button variant="outline" onClick={handleLogout} className="border-2">
                  <LogOut className="h-4 w-4 mr-2" />
                  Odhlásiť sa
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setCurrentPage('login')} className="border-2">
                  Prihlásiť sa
                </Button>
                <Button onClick={() => setCurrentPage('register')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover
                  Registrovať
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
