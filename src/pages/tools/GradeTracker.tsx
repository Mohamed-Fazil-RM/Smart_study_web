import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const GradeTracker = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, name: 'Midterm Exam', grade: 85, weight: 30 },
    { id: 2, name: 'Homework 1', grade: 92, weight: 10 },
    { id: 3, name: 'Project', grade: 78, weight: 40 },
  ]);
  const [newAssignmentName, setNewAssignmentName] = useState('');
  const [newAssignmentGrade, setNewAssignmentGrade] = useState('');
  const [newAssignmentWeight, setNewAssignmentWeight] = useState('');

  const addAssignment = () => {
    if (newAssignmentName && newAssignmentGrade && newAssignmentWeight) {
      const newAssignment = {
        id: assignments.length + 1,
        name: newAssignmentName,
        grade: parseFloat(newAssignmentGrade),
        weight: parseFloat(newAssignmentWeight),
      };
      setAssignments([...assignments, newAssignment]);
      setNewAssignmentName('');
      setNewAssignmentGrade('');
      setNewAssignmentWeight('');
    }
  };

  const deleteAssignment = (id: number) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  const calculateCurrentGrade = () => {
    let weightedSum = 0;
    let totalWeight = 0;
    assignments.forEach(assignment => {
      weightedSum += (assignment.grade * assignment.weight);
      totalWeight += assignment.weight;
    });
    if (totalWeight === 0) return 0;
    return (weightedSum / totalWeight).toFixed(2);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700">
            <div className="flex justify-between items-center h-16 px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="h-7 w-7" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Grade Tracker</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="pt-0 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="container py-10">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Tracker</CardTitle>
                  <CardDescription>Track your grades and calculate your current grade in real-time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[400px]">Assignment</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Weight (%)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.name}</TableCell>
                          <TableCell>{assignment.grade}</TableCell>
                          <TableCell>{assignment.weight}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => deleteAssignment(assignment.id)}>
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>Current Grade</TableCell>
                        <TableCell className="font-medium text-right">{calculateCurrentGrade()}%</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>

                  <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-3">
                    <div>
                      <Label htmlFor="name">Assignment Name</Label>
                      <Input
                        type="text"
                        id="name"
                        value={newAssignmentName}
                        onChange={(e) => setNewAssignmentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade</Label>
                      <Input
                        type="number"
                        id="grade"
                        value={newAssignmentGrade}
                        onChange={(e) => setNewAssignmentGrade(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (%)</Label>
                      <Input
                        type="number"
                        id="weight"
                        value={newAssignmentWeight}
                        onChange={(e) => setNewAssignmentWeight(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="mt-4" onClick={addAssignment}>
                    Add Assignment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default GradeTracker;
