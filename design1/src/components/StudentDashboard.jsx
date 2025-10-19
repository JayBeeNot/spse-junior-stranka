import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Users, FileText, Trophy, Download, Upload, UserPlus } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function StudentDashboard() {
  const context = useContext(AppContext);
  const [newTeamName, setNewTeamName] = useState('');
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [submissionCode, setSubmissionCode] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [selectedTeamForMember, setSelectedTeamForMember] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');

  if (!context) return null;
  const { user, teams, problems, submissions, createTeam, submitSolution, addTeamMember } = context;

  const myTeams = teams.filter(team => team.members.some(m => m.email === user?.email));
  const mySubmissions = submissions.filter(sub => sub.submittedBy === user?.id);

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      createTeam(newTeamName);
      setNewTeamName('');
      setCreateTeamOpen(false);
      toast.success('Tím bol úspešne vytvorený!');
    }
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim() && newMemberName.trim() && selectedTeamForMember) {
      const success = addTeamMember(selectedTeamForMember, newMemberEmail, newMemberName);
      if (success) {
        setNewMemberEmail('');
        setNewMemberName('');
        setAddMemberOpen(false);
        toast.success('Člen bol úspešne pridaný!');
      } else {
        toast.error('Člen už v tíme existuje');
      }
    }
  };

  const openAddMemberDialog = (teamId) => {
    setSelectedTeamForMember(teamId);
    setAddMemberOpen(true);
  };

  const handleSubmitSolution = () => {
    if (selectedProblem && selectedTeam && submissionCode.trim()) {
      submitSolution({
        problemId,
        teamId,
        submittedBy,
        code,
      });
      setSubmissionCode('');
      setSubmitDialogOpen(false);
      toast.success('Riešenie bolo úspešne odoslané!');
    }
  };

  const openSubmitDialog = (problemId) => {
    setSelectedProblem(problemId);
    if (myTeams.length > 0) {
      setSelectedTeam(myTeams[0].id);
    }
    setSubmitDialogOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm
      <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl mb-2">Študentský dashboard</h1>
        <p className="text-blue-100">Vitaj späť, {user?.name}!</p>
      </div>

      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList className="bg-white shadow-md border-2 border-gray-100">
          <TabsTrigger value="problems" className="data-[state=active]=active]=active]=active]
            <FileText className="h-4 w-4 mr-2" />
            Problémy
          </TabsTrigger>
          <TabsTrigger value="teams" className="data-[state=active]=active]=active]=active]
            <Users className="h-4 w-4 mr-2" />
            Moje tímy
          </TabsTrigger>
          <TabsTrigger value="submissions" className="data-[state=active]=active]=active]=active]
            <Trophy className="h-4 w-4 mr-2" />
            Moje odovzdania
          </TabsTrigger>
        </TabsList>

        {/* Problems Tab */}
        <TabsContent value="problems" className="space-y-4">
          <div className="grid gap-6 md
            {problems.map(problem => (
              <Card key={problem.id} className="hover
                
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <Badge variant={
                      problem.difficulty === 'Easy' ? 'default' === 'Medium' ? 'secondary' 
                    } className="shadow-sm">
                      {problem.difficulty === 'Easy' ? 'Ľahký' === 'Medium' ? 'Stredný' : 'Ťažký'}
                    </Badge>
                  </div>
                  <CardDescription className="text-blue-600">{problem.competition}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{problem.description}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 border-2">
                      <Download className="h-4 w-4 mr-2" />
                      Stiahnuť
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover
                      onClick={() => openSubmitDialog(problem.id)}
                      disabled={myTeams.length === 0}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Odovzdať
                    </Button>
                  </div>
                  {myTeams.length === 0 && (
                    <p className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">Vytvor tím na odovzdanie riešení</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border-2 border-gray-100">
            <h2 className="text-xl text-gray-900">Moje tímy</h2>
            <Dialog open={createTeamOpen} onOpenChange={setCreateTeamOpen}>
              
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover
                  <Users className="h-4 w-4 mr-2" />
                  Vytvoriť tím
                </Button>
              </DialogTrigger>
              
                  <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Vytvoriť nový tím</DialogTitle>
                  
                    Zadaj názov pre svoj tím
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamName">Názov tímu</Label>
                    <Input
                      id="teamName"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="napr., Kódoví bojovníci"
                      className="border-2"
                    />
                  </div>
                  <Button onClick={handleCreateTeam} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover
                    Vytvoriť tím
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6 md
            {myTeams.map(team => (
              <Card key={team.id} className="hover
                
                  <CardTitle className="text-blue-700">{team.name}</CardTitle>
                  
                    Vytvorené {new Date(team.createdAt).toLocaleDateString('sk-SK')}
                  </CardDescription>
                </CardHeader>
                
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">Členovia ({team.members.length})
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openAddMemberDialog(team.id)}
                        className="border-2 hover
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Pridať
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {team.members.map((member, idx) => (
                        <div key={idx} className="text-sm bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                          <div className="font-medium text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-500">{member.email}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {myTeams.length === 0 && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="py-12 text-center text-gray-500">
                Ešte si nevytvoril žiadne tímy. Vytvor tím pre odovzdávanie riešení.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <h2 className="text-xl text-gray-900 bg-white p-4 rounded-xl shadow-md border-2 border-gray-100">Moje odovzdania</h2>
          
          {mySubmissions.length > 0 ? (
            <Card className="shadow-lg border-2 border-gray-100">
              
                  <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                    Problém</TableHead>
                    Tím</TableHead>
                    Odovzdané</TableHead>
                    Stav</TableHead>
                  </TableRow>
                </TableHeader>
                
                  {mySubmissions.map(submission => {
                    const problem = problems.find(p => p.id === submission.problemId);
                    const team = teams.find(t => t.id === submission.teamId);
                    return (
                      <TableRow key={submission.id} className="hover
                        <TableCell className="font-medium">{problem?.title || 'Neznámy'}</TableCell>
                        {team?.name || 'Neznámy'}</TableCell>
                        {new Date(submission.submittedAt).toLocaleString('sk-SK')}</TableCell>
                        
                          <Badge variant={
                            submission.status === 'accepted' ? 'default' === 'rejected' ? 'destructive' 
                          } className="shadow-sm">
                            {submission.status === 'accepted' ? 'Prijaté' === 'rejected' ? 'Zamietnuté' : 'Čaká'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="py-12 text-center text-gray-500">
                Zatiaľ si neodovzdal žiadne riešenia.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Submit Solution Dialog */}
      <Dialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <DialogContent className="max-w-2xl border-2 border-gray-100 shadow-2xl">
          
            <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Odovzdať riešenie</DialogTitle>
            
              Odovzdaj svoje riešenie pre {problems.find(p => p.id === selectedProblem)?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team">Vyber tím</Label>
              <select
                id="team"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus
              >
                {myTeams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Tvoje riešenie</Label>
              <Textarea
                id="code"
                value={submissionCode}
                onChange={(e) => setSubmissionCode(e.target.value)}
                placeholder="Vlož svoj kód sem..."
                rows={12}
                className="font-mono text-sm border-2 border-gray-300 focus
              />
            </div>
            <Button onClick={handleSubmitSolution} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover
              Odovzdať riešenie
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Dialog */}
      <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
        <DialogContent className="border-2 border-gray-100 shadow-2xl">
          
            <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pridať člena tímu</DialogTitle>
            
              Pridaj nového člena do svojho tímu
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              
                Zadaj email a meno osoby, ktorú chceš pridať. Nemusí ešte mať vytvorený účet.
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              <Label htmlFor="memberName">Meno člena</Label>
              <Input
                id="memberName"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="napr., Jana Nováková"
                className="border-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memberEmail">Email člena</Label>
              <Input
                id="memberEmail"
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="napr., jana@skola.sk"
                className="border-2"
              />
            </div>
            <Button onClick={handleAddMember} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover
              Pridať člena
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
