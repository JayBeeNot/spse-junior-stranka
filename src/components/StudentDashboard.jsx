import React, { useState } from 'react';
import { Button } from './ui-js/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui-js/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui-js/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui-js/dialog';
import { Textarea } from './ui-js/textarea';
import { Label } from './ui-js/label';
import { Trophy, Home, LogOut, Calendar, Users, Gift, Upload, CheckCircle, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function StudentDashboard({
  user,
  competitions,
  submissions,
  onLogout,
  onSubmitAnswer,
  onNavigateToHome
}) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleOpenSubmitModal = (competition) => {
    setSelectedCompetition(competition);
    setShowSubmitModal(true);
  };

  const handleSubmit = () => {
    if (!selectedCompetition || !answerText.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    onSubmitAnswer(selectedCompetition.id, answerText, fileUrl || undefined);
    toast.success('Answer submitted successfully!');
    setShowSubmitModal(false);
    setAnswerText('');
    setFileUrl('');
    setSelectedCompetition(null);
  };

  const hasSubmitted = (competitionId) => {
    return submissions.some(s => s.competitionId === competitionId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Trophy className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-blue-900">Student Dashboard</h1>
              <p className="text-gray-600">Team: {user.teamName}</p>
            </div>
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
        <Tabs defaultValue="competitions" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="competitions">Available Competitions</TabsTrigger>
            <TabsTrigger value="submissions">My Submissions</TabsTrigger>
          </TabsList>

          {/* Available Competitions Tab */}
          <TabsContent value="competitions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((competition) => {
                const submitted = hasSubmitted(competition.id);

                return (
                  <Card key={competition.id} className="overflow-hidden">
                    <div className="relative w-full overflow-hidden rounded-b-none" style={{ aspectRatio: '16/9' }}>
                      <ImageWithFallback
                        src={competition.imageUrl}
                        alt={competition.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{competition.title}</CardTitle>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {competition.category}
                        </span>
                      </div>
                      <CardDescription>{competition.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>Deadline: {competition.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>Max {competition.maxTeamSize} members</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <Gift className="h-4 w-4" />
                          <span>{competition.prize}</span>
                        </div>
                      </div>

                      {submitted ? (
                        <Button className="w-full border border-green-200 text-green-700" disabled>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Already Submitted
                        </Button>
                      ) : (
                        <Button
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleOpenSubmitModal(competition)}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Submit Answer
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {competitions.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No competitions available at the moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* My Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="space-y-4">
              {submissions.map((submission) => {
                const competition = competitions.find(c => c.id === submission.competitionId);

                return (
                  <Card key={submission.id} className="overflow-hidden">
                    <CardHeader className="bg-green-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            {competition?.title || 'Competition'}
                          </CardTitle>
                          <CardDescription>
                            Submitted on {new Date(submission.submittedAt).toLocaleString()}
                          </CardDescription>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {competition?.category || 'N/A'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Team Name</Label>
                          <p className="text-gray-700 mt-1">{submission.teamName}</p>
                        </div>
                        <div>
                          <Label className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Your Answer
                          </Label>
                          <div className="bg-gray-50 p-4 rounded-lg mt-2 border">
                            <p className="text-gray-700 whitespace-pre-line">{submission.answerText}</p>
                          </div>
                        </div>
                        {submission.fileUrl && (
                          <div>
                            <Label>Attached File</Label>
                            <p className="text-blue-600 mt-1 break-all">{submission.fileUrl}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {submissions.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>You haven't submitted any answers yet.</p>
                  <p className="mt-2">Go to "Available Competitions" to get started!</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Submit Answer Modal */}
      <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Your Answer</DialogTitle>
            <DialogDescription>
              {selectedCompetition && `Submit your entry for ${selectedCompetition.title}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="answer">Your Answer / Project Description</Label>
              <Textarea
                id="answer"
                placeholder="Describe your solution, approach, or project details..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={8}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileUrl">File URL (Optional)</Label>
              <input
                id="fileUrl"
                type="text"
                placeholder="https://example.com/your-file.pdf"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-gray-500">
                Provide a link to your project files, documentation, or supporting materials
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Answer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
