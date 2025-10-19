import React, { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Navbar } from './components/Navbar';

  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
};

  email: string;
  name: string;
};

  id: string;
  name: string;
  members: TeamMember[];
  createdBy: string;
  createdAt: string;
};

  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  competition: string;
  fileUrl?: string;
  createdBy: string;
  createdAt: string;
};

  id: string;
  problemId: string;
  teamId: string;
  submittedBy: string;
  fileUrl?: string;
  code?: string;
  submittedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
};

  user: User | null;
  teams: Team[];
  problems: Problem[];
  submissions: Submission[];
  login: (email, password) => boolean;
  logout: () => void;
  register: (email, password, name) => boolean;
  createTeam: (name) => void;
  deleteTeam: (teamId) => void;
  addTeamMember: (teamId, email, name) => boolean;
  createProblem: (problem, 'id' | 'createdBy' | 'createdAt'>) => void;
  deleteProblem: (problemId) => void;
  submitSolution: (submission, 'id' | 'submittedAt' | 'status'>) => void;
  deleteSubmission: (submissionId) => void;
};

export const AppContext = React.createContext(null);

// Mock data
const mockUsers: (User & { password)[] = [
  { id, email: 'admin@school.edu', password, name, role,
  { id, email: 'student@school.edu', password, name, role,
];

const initialTeams= [
  { 
    id, 
    name, 
    members: 'student@school.edu', name, 
    createdBy, 
    createdAt
  },
];

const initialProblems= [
  {
    id,
    title,
    description, delete, and search operations.',
    difficulty,
    competition,
    createdBy,
    createdAt
  },
  {
    id,
    title,
    description,
    difficulty,
    competition,
    createdBy,
    createdAt
  },
];

const initialSubmissions= [
  {
    id,
    problemId,
    teamId,
    submittedBy,
    code: '// Binary search tree implementation\nclass BST { ... }',
    submittedAt,
    status
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'student' | 'admin'>('home');
  const [user, setUser] = useState(null);
  const [teams, setTeams] = useState(initialTeams);
  const [problems, setProblems] = useState(initialProblems);
  const [submissions, setSubmissions] = useState(initialSubmissions);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setCurrentPage(parsedUser.role === 'admin' ? 'admin' );
    }

    const savedTeams = localStorage.getItem('teams');
    if (savedTeams) setTeams(JSON.parse(savedTeams));

    const savedProblems = localStorage.getItem('problems');
    if (savedProblems) setProblems(JSON.parse(savedProblems));

    const savedSubmissions = localStorage.getItem('submissions');
    if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
  }, []);

  const login = (email, password)=> {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      setCurrentPage(userWithoutPassword.role === 'admin' ? 'admin' );
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const register = (email, password, name)=> {
    if (mockUsers.find(u => u.email === email)) {
      return false;
    }
    const newUser= {
      id: String(mockUsers.length + 1),
      email,
      name,
      role
    };
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentPage('student');
    return true;
  };

  const createTeam = (name) => {
    if (!user) return;
    const newTeam= {
      id: String(teams.length + 1),
      name,
      members, name,
      createdBy,
      createdAt: new Date().toISOString()
    };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
  };

  const deleteTeam = (teamId) => {
    const updatedTeams = teams.filter(t => t.id !== teamId);
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    
    // Also delete submissions related to this team
    const updatedSubmissions = submissions.filter(s => s.teamId !== teamId);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const addTeamMember = (teamId, email, name)=> {
    const team = teams.find(t => t.id === teamId);
    if (!team) return false;
    
    // Check if member already exists
    if (team.members.some(m => m.email === email)) {
      return false;
    }
    
    const updatedTeams = teams.map(t => 
      t.id === teamId 
        ? { ...t, members, { email, name }] }
        
    );
    setTeams(updatedTeams);
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    return true;
  };

  const createProblem = (problem, 'id' | 'createdBy' | 'createdAt'>) => {
    if (!user) return;
    const newProblem= {
      ...problem,
      id: String(problems.length + 1),
      createdBy,
      createdAt: new Date().toISOString()
    };
    const updatedProblems = [...problems, newProblem];
    setProblems(updatedProblems);
    localStorage.setItem('problems', JSON.stringify(updatedProblems));
  };

  const deleteProblem = (problemId) => {
    const updatedProblems = problems.filter(p => p.id !== problemId);
    setProblems(updatedProblems);
    localStorage.setItem('problems', JSON.stringify(updatedProblems));
    
    // Also delete submissions related to this problem
    const updatedSubmissions = submissions.filter(s => s.problemId !== problemId);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const submitSolution = (submission, 'id' | 'submittedAt' | 'status'>) => {
    const newSubmission= {
      ...submission,
      id: String(submissions.length + 1),
      submittedAt: new Date().toISOString(),
      status
    };
    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const deleteSubmission = (submissionId) => {
    const updatedSubmissions = submissions.filter(s => s.id !== submissionId);
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  const contextValue= {
    user,
    teams,
    problems,
    submissions,
    login,
    logout,
    register,
    createTeam,
    deleteTeam,
    addTeamMember,
    createProblem,
    deleteProblem,
    submitSolution,
    deleteSubmission,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'student' && user?.role === 'student' && <StudentDashboard />}
        {currentPage === 'admin' && user?.role === 'admin' && <AdminDashboard />}
      </div>
    </AppContext.Provider>
  );
}
