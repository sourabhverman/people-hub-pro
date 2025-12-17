import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Calendar as CalendarIcon, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';

const leaveBalance = [
  { type: 'Casual Leave', total: 12, used: 4, remaining: 8 },
  { type: 'Sick Leave', total: 12, used: 2, remaining: 10 },
  { type: 'Earned Leave', total: 15, used: 5, remaining: 10 },
  { type: 'Unpaid Leave', total: 0, used: 0, remaining: 0 },
];

const leaveHistory = [
  {
    id: 1,
    type: 'Casual Leave',
    from: 'Dec 20, 2024',
    to: 'Dec 22, 2024',
    days: 3,
    reason: 'Family function',
    status: 'approved',
    appliedOn: 'Dec 15, 2024',
  },
  {
    id: 2,
    type: 'Sick Leave',
    from: 'Nov 10, 2024',
    to: 'Nov 11, 2024',
    days: 2,
    reason: 'Not feeling well',
    status: 'approved',
    appliedOn: 'Nov 10, 2024',
  },
  {
    id: 3,
    type: 'Casual Leave',
    from: 'Jan 5, 2025',
    to: 'Jan 7, 2025',
    days: 3,
    reason: 'Personal work',
    status: 'pending',
    appliedOn: 'Dec 28, 2024',
  },
];

const statusStyles = {
  approved: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-destructive',
};

const statusIcons = {
  approved: CheckCircle,
  pending: Clock,
  rejected: XCircle,
};

export default function Leave() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AppLayout title="Leave Management" subtitle="Apply for leave and track your leave balance">
      <div className="space-y-6">
        {/* Leave Balance Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leaveBalance.map((leave) => (
            <Card key={leave.type} className="stat-card">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-muted-foreground mb-3">{leave.type}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-foreground">{leave.remaining}</p>
                    <p className="text-xs text-muted-foreground">remaining</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">{leave.used}</span> used
                    </p>
                    <p className="text-muted-foreground">
                      of <span className="text-foreground font-medium">{leave.total}</span> total
                    </p>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-4 h-1.5 w-full rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${(leave.used / Math.max(leave.total, 1)) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Leave History & Apply */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Leave Requests</CardTitle>
                <CardDescription>Your leave history and pending requests</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Apply Leave
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Apply for Leave</DialogTitle>
                    <DialogDescription>
                      Fill in the details to submit your leave request
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Leave Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="casual">Casual Leave</SelectItem>
                          <SelectItem value="sick">Sick Leave</SelectItem>
                          <SelectItem value="earned">Earned Leave</SelectItem>
                          <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Input type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Textarea placeholder="Enter reason for leave..." rows={3} />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Days</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applied On</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveHistory.map((leave) => {
                        const StatusIcon = statusIcons[leave.status as keyof typeof statusIcons];
                        return (
                          <TableRow key={leave.id}>
                            <TableCell className="font-medium">{leave.type}</TableCell>
                            <TableCell className="text-muted-foreground">
                              {leave.from} - {leave.to}
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{leave.days} days</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={`gap-1 ${statusStyles[leave.status as keyof typeof statusStyles]}`}
                              >
                                <StatusIcon className="h-3 w-3" />
                                {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {leave.appliedOn}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Leave Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Legend</p>
                <div className="flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-success" />
                    <span className="text-muted-foreground">Approved</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                    <span className="text-muted-foreground">Pending</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-info" />
                    <span className="text-muted-foreground">Holiday</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
