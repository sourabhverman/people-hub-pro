import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const employees = [
  {
    id: 'EMP00001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 234 567 890',
    department: 'Engineering',
    designation: 'Senior Developer',
    status: 'active',
    joinDate: 'Jan 15, 2023',
  },
  {
    id: 'EMP00002',
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '+1 234 567 891',
    department: 'Marketing',
    designation: 'Marketing Manager',
    status: 'active',
    joinDate: 'Mar 22, 2022',
  },
  {
    id: 'EMP00003',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    phone: '+1 234 567 892',
    department: 'Human Resources',
    designation: 'HR Specialist',
    status: 'notice_period',
    joinDate: 'Jun 10, 2021',
  },
  {
    id: 'EMP00004',
    name: 'Michael Brown',
    email: 'michael.brown@company.com',
    phone: '+1 234 567 893',
    department: 'Finance',
    designation: 'Financial Analyst',
    status: 'active',
    joinDate: 'Nov 5, 2023',
  },
  {
    id: 'EMP00005',
    name: 'Jessica Williams',
    email: 'jessica.williams@company.com',
    phone: '+1 234 567 894',
    department: 'Sales',
    designation: 'Sales Executive',
    status: 'active',
    joinDate: 'Aug 18, 2022',
  },
];

const statusStyles = {
  active: 'badge-success',
  notice_period: 'badge-warning',
  exited: 'badge-destructive',
};

const statusLabels = {
  active: 'Active',
  notice_period: 'Notice Period',
  exited: 'Exited',
};

export default function Employees() {
  return (
    <AppLayout title="Employees" subtitle="Manage your organization's workforce">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search employees..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Employee Table */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              A list of all employees in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-normal">
                        {employee.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.designation}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {employee.joinDate}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusStyles[employee.status as keyof typeof statusStyles]}
                      >
                        {statusLabels[employee.status as keyof typeof statusLabels]}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Call
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
