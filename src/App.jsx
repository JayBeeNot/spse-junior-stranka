import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { CompetitionDetailsPage } from './components/CompetitionDetailsPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState({ type: 'home' });
  const [currentUser, setCurrentUser] = useState(null);
  const [competitions, setCompetitions] = useState([
    {
      id: '1',
      title: 'Regional Science Fair',
      category: 'Science',
      description: 'Showcase your innovative science project and compete with students from across the region.',
      deadline: '2025-11-15',
      maxTeamSize: 3,
      prize: '$500 + Trophy',
      rules: 'Teams must submit a research paper and present their project. Projects must be original work.',
      imageUrl: 'https://images.unsplash.com/photo-1605781645799-c9c7d820b4ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MTc4OTk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '2',
      title: 'Math Olympiad Challenge',
      category: 'Math',
      description: 'Test your mathematical prowess in this challenging olympiad-style competition.',
      deadline: '2025-11-20',
      maxTeamSize: 2,
      prize: '$300 + Certificate',
      rules: 'Solve complex mathematical problems within the time limit. Calculators not allowed.',
      imageUrl: 'https://images.unsplash.com/photo-1511629091441-ee46146481b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljcyUyMGVxdWF0aW9ucyUyMGJvYXJkfGVufDF8fHx8MTc2MTg1NjIxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      title: 'Coding Hackathon',
      category: 'Technology',
      description: 'Build an innovative app or solution in 48 hours. All programming languages welcome.',
      deadline: '2025-11-25',
      maxTeamSize: 4,
      prize: '$1000 + Internship Opportunities',
      rules: 'Submit working code with documentation. Project must be started during hackathon.',
      imageUrl: 'https://images.unsplash.com/photo-1635775017492-1eb935a082a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwY29tcHV0ZXJ8ZW58MXx8fHwxNzYxODU2MjE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      title: 'Digital Arts Showcase',
      category: 'Arts',
      description: 'Display your creative digital artwork and compete for the grand prize.',
      deadline: '2025-12-01',
      maxTeamSize: 1,
      prize: '$400 + Gallery Exhibition',
      rules: 'Submit original digital artwork in any medium. Theme: "Future Visions".',
      imageUrl: 'https://images.unsplash.com/photo-1551401108-1c81f75e0820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRzJTIwcGFpbnRpbmclMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjE4NTYyMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ]);
  const [submissions, setSubmissions] = useState([]);
  const [users, setUsers] = useState([
    { id: 'admin1', email: 'admin@school.edu', role: 'admin' }
  ]);

  const handleLogin = (email, password, role) => {
    const user = users.find(u => u.email === email && u.role === role);
    if (user) {
      setCurrentUser(user);
      setCurrentPage({ type: role === 'admin' ? 'admin-dashboard' : 'student-dashboard' });
      return true;
    }
    return false;
  };

  const handleRegister = (email, password, teamName) => {
    if (users.some(u => u.email === email)) {
      return false;
    }
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      role: 'student',
      teamName
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentPage({ type: 'student-dashboard' });
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage({ type: 'home' });
  };

  const addCompetition = (competition) => {
    const newCompetition = {
      ...competition,
      id: `comp-${Date.now()}`
    };
    setCompetitions([...competitions, newCompetition]);
  };

  const deleteCompetition = (id) => {
    setCompetitions(competitions.filter(c => c.id !== id));
    setSubmissions(submissions.filter(s => s.competitionId !== id));
  };

  const submitAnswer = (competitionId, answerText, fileUrl) => {
    if (!currentUser) return;
    const newSubmission = {
      id: `sub-${Date.now()}`,
      competitionId,
      teamName: currentUser.teamName || 'No Team',
      studentEmail: currentUser.email,
      submittedAt: new Date().toISOString(),
      answerText,
      fileUrl
    };
    setSubmissions([...submissions, newSubmission]);
  };

  const deleteSubmission = (id) => {
    setSubmissions(submissions.filter(s => s.id !== id));
  };

  const renderPage = () => {
    switch (currentPage.type) {
      case 'home':
        return (
          <HomePage
            competitions={competitions}
            onNavigateToCompetition={(id) => setCurrentPage({ type: 'competition-details', competitionId: id })}
            onNavigateToLogin={() => setCurrentPage({ type: 'login' })}
            onNavigateToRegister={() => setCurrentPage({ type: 'register' })}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
        );
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentPage({ type: 'register' })}
            onNavigateToHome={() => setCurrentPage({ type: 'home' })}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentPage({ type: 'login' })}
            onNavigateToHome={() => setCurrentPage({ type: 'home' })}
          />
        );
      case 'student-dashboard':
        return (
          <StudentDashboard
            user={currentUser}
            competitions={competitions}
            submissions={submissions.filter(s => s.studentEmail === currentUser?.email)}
            onLogout={handleLogout}
            onSubmitAnswer={submitAnswer}
            onNavigateToHome={() => setCurrentPage({ type: 'home' })}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            competitions={competitions}
            submissions={submissions}
            users={users}
            onAddCompetition={addCompetition}
            onDeleteCompetition={deleteCompetition}
            onDeleteSubmission={deleteSubmission}
            onLogout={handleLogout}
            onNavigateToHome={() => setCurrentPage({ type: 'home' })}
          />
        );
      case 'competition-details':
        return (
          <CompetitionDetailsPage
            competition={competitions.find(c => c.id === currentPage.competitionId)}
            onNavigateToLogin={() => setCurrentPage({ type: 'login' })}
            onNavigateToRegister={() => setCurrentPage({ type: 'register' })}
            onNavigateToHome={() => setCurrentPage({ type: 'home' })}
            currentUser={currentUser}
            onSubmitAnswer={submitAnswer}
            userSubmission={submissions.find(s =>
              s.competitionId === currentPage.competitionId &&
              s.studentEmail === currentUser?.email
            )}
          />
        );
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
    </>
  );
}
