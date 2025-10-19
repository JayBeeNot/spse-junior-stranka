import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { FileText, Users, Trash2, Plus } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function AdminDashboard() {
  const context = useContext(AppContext);
  const [createProblemOpen, setCreateProblemOpen] =
    useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "team" | "problem" | "submission";
    id: string;
  } | null>(null);

  // Problem form state
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] =
    useState("");
  const [problemDifficulty, setProblemDifficulty] = useState<
    "Easy" | "Medium" | "Hard"
  >("Medium");
  const [problemCompetition, setProblemCompetition] =
    useState("");

  if (!context) return null;
  const {
    user,
    teams,
    problems,
    submissions,
    createProblem,
    deleteTeam,
    deleteProblem,
    deleteSubmission,
  } = context;

  const handleCreateProblem = () => {
    if (
      problemTitle.trim() &&
      problemDescription.trim() &&
      problemCompetition.trim()
    ) {
      createProblem({
        title,
        description,
        difficulty,
        competition,
      });

      // Reset form
      setProblemTitle("");
      setProblemDescription("");
      setProblemDifficulty("Medium");
      setProblemCompetition("");
      setCreateProblemOpen(false);
      toast.success("Problém bol úspešne vytvorený!");
    }
  };

  const confirmDelete = (
    type,
    id,
  ) => {
    setItemToDelete({ type, id });
    setDeleteConfirmOpen(true);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;

    switch (itemToDelete.type) {
      case "team":
        deleteTeam(itemToDelete.id);
        toast.success("Tím bol úspešne vymazaný");
        break;
      case "problem":
        deleteProblem(itemToDelete.id);
        toast.success("Problém bol úspešne vymazaný");
        break;
      case "submission":
        deleteSubmission(itemToDelete.id);
        toast.success("Odovzdanie bolo úspešne vymazané");
        break;
    }

    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm
      <div className="mb-8 bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl mb-2">Admin dashboard</h1>
        <p className="text-orange-100">
          Spravuj problémy, tímy a odovzdania
        </p>
      </div>

      <Tabs defaultValue="problems" className="space-y-6">
        <TabsList className="bg-white shadow-md border-2 border-gray-100">
          <TabsTrigger
            value="problems"
            className="data-[state=active]=active]=active]=active]
          >
            <FileText className="h-4 w-4 mr-2" />
            Problémy
          </TabsTrigger>
          <TabsTrigger
            value="teams"
            className="data-[state=active]=active]=active]=active]
          >
            <Users className="h-4 w-4 mr-2" />
            Všetky tímy
          </TabsTrigger>
          <TabsTrigger
            value="submissions"
            className="data-[state=active]=active]=active]=active]
          >
            <FileText className="h-4 w-4 mr-2" />
            Všetky odovzdania
          </TabsTrigger>
        </TabsList>

        {/* Problems Tab */}
        <TabsContent value="problems" className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border-2 border-gray-100">
            <h2 className="text-xl text-gray-900">
              Všetky problémy
            </h2>
            <Dialog
              open={createProblemOpen}
              onOpenChange={setCreateProblemOpen}
            >
              
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover
                  <Plus className="h-4 w-4 mr-2" />
                  Vytvoriť problém
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl border-2 border-gray-100 shadow-2xl">
                
                  <DialogTitle className="text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Vytvoriť nový problém
                  </DialogTitle>
                  
                    Pridaj nový problém pre študentov
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Názov problému
                    </Label>
                    <Input
                      id="title"
                      value={problemTitle}
                      onChange={(e) =>
                        setProblemTitle(e.target.value)
                      }
                      placeholder="napr., Implementácia binárneho vyhľadávania"
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="competition">Súťaž</Label>
                    <Input
                      id="competition"
                      value={problemCompetition}
                      onChange={(e) =>
                        setProblemCompetition(e.target.value)
                      }
                      placeholder="napr., Algoritmická výzva"
                      className="border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">
                      Obtiažnosť
                    </Label>
                    <Select
                      value={problemDifficulty}
                      onValueChange={(
                        value,
                      ) => setProblemDifficulty(value)}
                    >
                      <SelectTrigger className="border-2">
                        <SelectValue />
                      </SelectTrigger>
                      
                        <SelectItem value="Easy">
                          Ľahký
                        </SelectItem>
                        <SelectItem value="Medium">
                          Stredný
                        </SelectItem>
                        <SelectItem value="Hard">
                          Ťažký
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Popis</Label>
                    <Textarea
                      id="description"
                      value={problemDescription}
                      onChange={(e) =>
                        setProblemDescription(e.target.value)
                      }
                      placeholder="Popíš problém podrobne..."
                      rows={6}
                      className="border-2"
                    />
                  </div>

                  <Button
                    onClick={handleCreateProblem}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover
                  >
                    Vytvoriť problém
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="shadow-lg border-2 border-gray-100">
            
                <TableRow className="bg-gradient-to-r from-orange-50 to-red-50">
                  Názov</TableHead>
                  Súťaž</TableHead>
                  Obtiažnosť</TableHead>
                  Vytvorené</TableHead>
                  Akcie</TableHead>
                </TableRow>
              </TableHeader>
              
                {problems.map((problem) => (
                  <TableRow
                    key={problem.id}
                    className="hover
                  >
                    <TableCell className="font-medium">
                      {problem.title}
                    </TableCell>
                    <TableCell className="text-orange-700">
                      {problem.competition}
                    </TableCell>
                    
                      <Badge
                        variant={
                          problem.difficulty === "Easy"
                            ? "default"
                            === "Medium"
                              ? "secondary"
                              
                        }
                        className="shadow-sm"
                      >
                        {problem.difficulty === "Easy"
                          ? "Ľahký"
                          === "Medium"
                            ? "Stredný"
                            : "Ťažký"}
                      </Badge>
                    </TableCell>
                    
                      {new Date(
                        problem.createdAt,
                      ).toLocaleDateString("sk-SK")}
                    </TableCell>
                    
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          confirmDelete("problem", problem.id)
                        }
                        className="shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-4">
          <h2 className="text-xl text-gray-900 bg-white p-4 rounded-xl shadow-md border-2 border-gray-100">
            Všetky tímy
          </h2>

          <Card className="shadow-lg border-2 border-gray-100">
            
                <TableRow className="bg-gradient-to-r from-orange-50 to-red-50">
                  Názov tímu</TableHead>
                  Členovia</TableHead>
                  Vytvorené</TableHead>
                  Akcie</TableHead>
                </TableRow>
              </TableHeader>
              
                {teams.map((team) => (
                  <TableRow
                    key={team.id}
                    className="hover
                  >
                    <TableCell className="font-medium">
                      {team.name}
                    </TableCell>
                    
                      <div className="space-y-1">
                        {team.members.map((member, idx) => (
                          <div
                            key={idx}
                            className="text-sm bg-white px-2 py-1 rounded border border-gray-100"
                          >
                            <div className="font-medium">
                              {member.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {member.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    
                      {new Date(
                        team.createdAt,
                      ).toLocaleDateString("sk-SK")}
                    </TableCell>
                    
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          confirmDelete("team", team.id)
                        }
                        className="shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          <h2 className="text-xl text-gray-900 bg-white p-4 rounded-xl shadow-md border-2 border-gray-100">
            Všetky odovzdania
          </h2>

          <Card className="shadow-lg border-2 border-gray-100">
            
                <TableRow className="bg-gradient-to-r from-orange-50 to-red-50">
                  Problém</TableHead>
                  Tím</TableHead>
                  Odovzdané</TableHead>
                  Stav</TableHead>
                  Akcie</TableHead>
                </TableRow>
              </TableHeader>
              
                {submissions.map((submission) => {
                  const problem = problems.find(
                    (p) => p.id === submission.problemId,
                  );
                  const team = teams.find(
                    (t) => t.id === submission.teamId,
                  );
                  return (
                    <TableRow
                      key={submission.id}
                      className="hover
                    >
                      <TableCell className="font-medium">
                        {problem?.title || "Neznámy"}
                      </TableCell>
                      
                        {team?.name || "Neznámy"}
                      </TableCell>
                      
                        {new Date(
                          submission.submittedAt,
                        ).toLocaleString("sk-SK")}
                      </TableCell>
                      
                        <Badge
                          variant={
                            submission.status === "accepted"
                              ? "default"
                              === "rejected"
                                ? "destructive"
                                
                          }
                          className="shadow-sm"
                        >
                          {submission.status === "accepted"
                            ? "Prijaté"
                            === "rejected"
                              ? "Zamietnuté"
                              : "Čaká"}
                        </Badge>
                      </TableCell>
                      
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            confirmDelete(
                              "submission",
                              submission.id,
                            )
                          }
                          className="shadow-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
      >
        <AlertDialogContent className="border-2 border-gray-100 shadow-2xl">
          
            <AlertDialogTitle className="text-xl">
              Si si istý?
            </AlertDialogTitle>
            
              Túto akciu nie je možné vrátiť späť. Toto navždy
              vymaže{" "}
              {itemToDelete?.type === "team"
                ? "tím"
                === "problem"
                  ? "problém"
                  
              .
            </AlertDialogDescription>
          </AlertDialogHeader>
          
            <AlertDialogCancel className="border-2">
              Zrušiť
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-600 to-red-700 hover
            >
              Vymazať
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}