import React, { useState } from 'react';
import { Button } from './ui-js/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui-js/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui-js/dialog';
import { Textarea } from './ui-js/textarea';
import { Label } from './ui-js/label';
import { ArrowLeft, Trophy, Calendar, Users, Gift, FileText, Upload, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export function CompetitionDetailsPage({
  competition,
  onNavigateToLogin,
  onNavigateToRegister,
  onNavigateToHome,
  currentUser,
  onSubmitAnswer,
  userSubmission
}) {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [answerText, setAnswerText] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleSubmit = () => {
    if (!answerText.trim()) {
      toast.error('Please provide an answer');
      return;
    }

    onSubmitAnswer(competition.id, answerText, fileUrl || undefined);
    toast.success('Answer submitted successfully!');
    setShowSubmitModal(false);
    setAnswerText('');
    setFileUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Button className="border border-blue-200 text-blue-700 hover:bg-blue-50" onClick={onNavigateToHome}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <h1 className="text-blue-900">School Competitions Board</h1>
          </div>
        </div>
      </header>

      {/* Competition Details */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg mb-6" style={{ aspectRatio: '21/9' }}>
            <ImageWithFallback
              src={competition.imageUrl}
              alt={competition.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>

          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="mb-2">{competition.title}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {competition.category}
              </span>
            </div>
            {userSubmission && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                <CheckCircle className="h-5 w-5" />
                <span>Submitted</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Deadline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{competition.deadline}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Team Size
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Max {competition.maxTeamSize} member{competition.maxTeamSize !== 1 ? 's' : ''}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Prize
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-600">{competition.prize}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{competition.description}</p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Rules & Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-line">{competition.rules}</p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!currentUser && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle>Ready to Participate?</CardTitle>
              <CardDescription>
                Login or register to submit your answers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={onNavigateToLogin} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                Login
              </Button>
              <Button onClick={onNavigateToRegister} className="flex-1 border border-blue-200 text-blue-700 hover:bg-blue-50">
                Register
              </Button>
            </CardContent>
          </Card>
        )}

        {currentUser && currentUser.role === 'student' && (
          <div className="flex flex-col gap-4">
            {userSubmission ? (
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    Your Submission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-gray-600">Team: {userSubmission.teamName}</p>
                    <p className="text-gray-600">Submitted: {new Date(userSubmission.submittedAt).toLocaleString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200 mt-4">
                    <p className="text-gray-800 whitespace-pre-line">{userSubmission.answerText}</p>
                    {userSubmission.fileUrl && (
                      <p className="text-blue-600 mt-2">File: {userSubmission.fileUrl}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Button
                size="lg"
                onClick={() => setShowSubmitModal(true)}
                className="w-full bg-green-600 text-white hover:bg-green-700 shadow-sm"
              >
                <Upload className="h-5 w-5 mr-2" />
                Submit Your Answer
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Submit Answer Modal */}
      <Dialog open={showSubmitModal} onOpenChange={setShowSubmitModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Your Answer</DialogTitle>
            <DialogDescription>
              Submit your competition entry for {competition.title}
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
