import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  UserMinus, 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle,
  FileText,
  Package,
  Users,
  DollarSign
} from 'lucide-react';

const exitChecklist = [
  { id: 1, title: 'Submit Resignation', description: 'Submit formal resignation letter', completed: true },
  { id: 2, title: 'Manager Approval', description: 'Get approval from reporting manager', completed: true },
  { id: 3, title: 'HR Approval', description: 'HR department approval', completed: false },
  { id: 4, title: 'Asset Return', description: 'Return company laptop, ID card, etc.', completed: false },
  { id: 5, title: 'Knowledge Transfer', description: 'Complete handover documentation', completed: false },
  { id: 6, title: 'Exit Interview', description: 'Schedule and complete exit interview', completed: false },
  { id: 7, title: 'Final Settlement', description: 'Process final salary and dues', completed: false },
];

const exitRequests = [
  {
    id: 1,
    employee: 'Emily Chen',
    department: 'Human Resources',
    lwd: 'Jan 15, 2025',
    status: 'hr_approved',
    submittedOn: 'Dec 1, 2024',
  },
  {
    id: 2,
    employee: 'David Wilson',
    department: 'Engineering',
    lwd: 'Feb 28, 2025',
    status: 'manager_approved',
    submittedOn: 'Dec 10, 2024',
  },
  {
    id: 3,
    employee: 'Sarah Miller',
    department: 'Marketing',
    lwd: 'Jan 31, 2025',
    status: 'initiated',
    submittedOn: 'Dec 15, 2024',
  },
];

const statusStyles = {
  initiated: 'badge-warning',
  manager_approved: 'badge-info',
  hr_approved: 'badge-success',
  completed: 'badge-success',
  cancelled: 'badge-destructive',
};

const statusLabels = {
  initiated: 'Pending Manager',
  manager_approved: 'Pending HR',
  hr_approved: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export default function Exit() {
  const completedSteps = exitChecklist.filter(item => item.completed).length;
  const progress = (completedSteps / exitChecklist.length) * 100;

  return (
    <AppLayout title="Exit Management" subtitle="Resignation and offboarding process">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Exits</p>
                  <p className="text-3xl font-bold text-foreground">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10 text-info">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Notice Period</p>
                  <p className="text-3xl font-bold text-foreground">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed (Month)</p>
                  <p className="text-3xl font-bold text-foreground">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attrition Rate</p>
                  <p className="text-3xl font-bold text-foreground">4.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Exit Checklist */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Exit Checklist</CardTitle>
                  <CardDescription>Your offboarding progress</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <UserMinus className="mr-2 h-4 w-4" />
                      Resign
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Resignation</DialogTitle>
                      <DialogDescription>
                        Please fill in the details to initiate your resignation
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Last Working Day</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>Reason for Leaving</Label>
                        <Textarea 
                          placeholder="Please share your reason for resignation..." 
                          rows={4}
                        />
                      </div>
                    </form>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Submit Resignation</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{completedSteps}/{exitChecklist.length}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                {exitChecklist.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${
                      item.completed ? 'bg-success/5 border-success/20' : 'bg-muted/30'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`text-sm font-medium ${item.completed ? 'text-success' : 'text-foreground'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exit Requests Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Exit Requests</CardTitle>
              <CardDescription>Manage employee resignations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Working Day</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exitRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{request.employee}</p>
                          <p className="text-xs text-muted-foreground">
                            Submitted: {request.submittedOn}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{request.department}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {request.lwd}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={statusStyles[request.status as keyof typeof statusStyles]}
                        >
                          {statusLabels[request.status as keyof typeof statusLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Exit Process Guide */}
        <Card>
          <CardHeader>
            <CardTitle>Exit Process Guide</CardTitle>
            <CardDescription>Steps involved in the offboarding process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <FileText className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-foreground">1. Submit Resignation</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Submit formal resignation with last working day
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-info/10 text-info mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-foreground">2. Approvals</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Manager and HR approval for resignation
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10 text-warning mb-3">
                  <Package className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-foreground">3. Handover</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Knowledge transfer and asset return
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-muted/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success mb-3">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h4 className="font-medium text-foreground">4. Settlement</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Final salary and full & final settlement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
