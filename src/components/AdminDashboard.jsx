import React, { useState } from 'react';
import { Button } from './ui-js/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui-js/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui-js/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui-js/dialog';
import { Input } from './ui-js/input';
import { Textarea } from './ui-js/textarea';
import { Label } from './ui-js/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui-js/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui-js/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from './ui-js/alert-dialog';
import { Trophy, Home, LogOut, Plus, Trash2, Mail, Users, FileText, Award } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdminDashboard({
  competitions,
  submissions,
  users,
  onAddCompetition,
  onDeleteCompetition,
  onDeleteSubmission,
  onLogout,
  onNavigateToHome
}) {
  const [showAddCompetitionModal, setShowAddCompetitionModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Add Competition Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Science');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [maxTeamSize, setMaxTeamSize] = useState('1');
  const [prize, setPrize] = useState('');
  const [rules, setRules] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Email Form State
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleAddCompetition = () => {
    if (!title || !description || !deadline || !prize || !rules) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newCompetition = {
      title,
      category,
      description,
      deadline,
      maxTeamSize: parseInt(maxTeamSize),
      prize,
      rules,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1514820720301-4c4790309f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGNvbXBldGl0aW9uJTIwdHJvcGh5fGVufDF8fHx8MTc2MTg1NjIxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    };

    onAddCompetition(newCompetition);
    toast.success('Competition added successfully!');

    // Reset form
    setTitle('');
    setCategory('Science');
    setDescription('');
    setDeadline('');
    setMaxTeamSize('1');
    setPrize('');
    setRules('');
    setImageUrl('');
    setShowAddCompetitionModal(false);
  };

  const handleSendEmail = () => {
    if (!emailSubject || !emailBody) {
      toast.error('Please fill in subject and message');
      return;
    }

    const studentEmails = users.filter(u => u.role === 'student').map(u => u.email);

    // In a real application, this would send actual emails
    // For this demo, we'll simulate it
    console.log('Sending email to:', studentEmails);
    console.log('Subject:', emailSubject);
    console.log('Body:', emailBody);

    toast.success(`Email sent to ${studentEmails.length} students!`);
    setEmailSubject('');
    setEmailBody('');
    setShowEmailModal(false);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === 'competition') {
      onDeleteCompetition(deleteTarget.id);
      toast.success('Competition deleted successfully');
    } else {
      onDeleteSubmission(deleteTarget.id);
      toast.success('Submission deleted successfully');
    }

    setDeleteTarget(null);
  };

  const studentUsers = users.filter(u => u.role === 'student');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 text-blue-600" />
            <h1 className="text-blue-900">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button className="border border-blue-200 text-blue-700 hover:bg-blue-50" onClick={onNavigateToHome}>
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            <Button onClick={onLogout} className="bg-red-600 text-white hover:bg-red-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Competitions</CardTitle>
              <Award className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-600">{competitions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Total Submissions</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-600">{submissions.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Registered Students</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-blue-600">{studentUsers.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Quick Actions</CardTitle>
              <Plus className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <Button
                size="sm"
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowAddCompetitionModal(true)}
              >
                Add Competition
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="competitions" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          {/* Competitions Management Tab */}
          <TabsContent value="competitions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2>Manage Competitions</h2>
              <Button onClick={() => setShowAddCompetitionModal(true)} className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Competition
              </Button>
            </div>

            <div className="space-y-4">
              {competitions.map((competition) => (
                <Card key={competition.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 items-start">
                        <div className="relative w-40 rounded-lg overflow-hidden shadow-sm hidden sm:block" style={{ aspectRatio: '16/9' }}>
                          <img src={competition.imageUrl} alt={competition.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                        <div>
                          <CardTitle>{competition.title}</CardTitle>
                          <CardDescription>
                            {competition.category} • Deadline: {competition.deadline}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setDeleteTarget({ type: 'competition', id: competition.id })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{competition.description}</p>
                    <div className="grid grid-cols-2 gap-4 text-gray-600">
                      <div>Prize: {competition.prize}</div>
                      <div>Max Team Size: {competition.maxTeamSize}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {competitions.length === 0 && (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No competitions yet. Add your first competition!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <h2>All Submissions</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Competition</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Student Email</TableHead>
                      <TableHead>Submitted At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => {
                      const competition = competitions.find(c => c.id === submission.competitionId);
                      return (
                        <TableRow key={submission.id}>
                          <TableCell>{competition?.title || 'N/A'}</TableCell>
                          <TableCell>{submission.teamName}</TableCell>
                          <TableCell>{submission.studentEmail}</TableCell>
                          <TableCell>{new Date(submission.submittedAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeleteTarget({ type: 'submission', id: submission.id })}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {submissions.length === 0 && (
                  <div className="py-12 text-center text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No submissions yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <h2>Registered Students</h2>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Team Name</TableHead>
                      <TableHead>Submissions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentUsers.map((user) => {
                      const userSubmissions = submissions.filter(s => s.studentEmail === user.email);
                      return (
                        <TableRow key={user.id}>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.teamName || 'N/A'}</TableCell>
                          <TableCell>{userSubmissions.length}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                {studentUsers.length === 0 && (
                  <div className="py-12 text-center text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No students registered yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Tab */}
          <TabsContent value="email" className="space-y-6">
            <h2>Send Email to All Students</h2>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Email to Students</CardTitle>
                <CardDescription>
                  Send announcements or updates to all registered students ({studentUsers.length} recipients)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailSubject">Subject</Label>
                  <Input
                    id="emailSubject"
                    placeholder="Competition Update"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailBody">Message</Label>
                  <Textarea
                    id="emailBody"
                    placeholder="Dear students, we are excited to announce..."
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={10}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 mb-2">Recipients ({studentUsers.length}):</p>
                  <p className="text-blue-700">
                    {studentUsers.map(u => u.email).join(', ') || 'No students registered'}
                  </p>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSendEmail}
                  disabled={studentUsers.length === 0}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email to All Students
                </Button>

                <p className="text-gray-500 text-center">
                  Note: In a production environment, this would send actual emails through an email service provider.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Competition Modal */}
      <Dialog open={showAddCompetitionModal} onOpenChange={setShowAddCompetitionModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Competition</DialogTitle>
            <DialogDescription>
              Create a new competition for students to participate in
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Regional Science Fair"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Math">Math</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the competition"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxTeamSize">Max Team Size *</Label>
                <Input
                  id="maxTeamSize"
                  type="number"
                  min="1"
                  value={maxTeamSize}
                  onChange={(e) => setMaxTeamSize(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prize">Prize *</Label>
              <Input
                id="prize"
                placeholder="$500 + Trophy"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rules">Rules & Guidelines *</Label>
              <Textarea
                id="rules"
                placeholder="Competition rules and requirements..."
                value={rules}
                onChange={(e) => setRules(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddCompetitionModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCompetition}>
              Add Competition
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteTarget?.type}.
              {deleteTarget?.type === 'competition' && ' All submissions for this competition will also be deleted.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
