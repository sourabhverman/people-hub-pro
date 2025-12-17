import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Building2, ChevronRight } from 'lucide-react';

const orgStructure = {
  ceo: {
    name: 'Robert Anderson',
    role: 'Chief Executive Officer',
    department: 'Executive',
    reports: [
      {
        name: 'Sarah Johnson',
        role: 'VP Engineering',
        department: 'Engineering',
        reports: [
          { name: 'John Doe', role: 'Senior Developer', department: 'Engineering' },
          { name: 'Jane Smith', role: 'Tech Lead', department: 'Engineering' },
          { name: 'Mike Chen', role: 'Developer', department: 'Engineering' },
        ],
      },
      {
        name: 'Emily Davis',
        role: 'VP Human Resources',
        department: 'Human Resources',
        reports: [
          { name: 'Lisa Wong', role: 'HR Manager', department: 'Human Resources' },
          { name: 'Tom Wilson', role: 'Recruiter', department: 'Human Resources' },
        ],
      },
      {
        name: 'Michael Brown',
        role: 'VP Finance',
        department: 'Finance',
        reports: [
          { name: 'David Lee', role: 'Financial Analyst', department: 'Finance' },
        ],
      },
    ],
  },
};

const departments = [
  { name: 'Engineering', headcount: 45, manager: 'Sarah Johnson', growth: '+5' },
  { name: 'Human Resources', headcount: 12, manager: 'Emily Davis', growth: '+2' },
  { name: 'Finance', headcount: 18, manager: 'Michael Brown', growth: '0' },
  { name: 'Marketing', headcount: 24, manager: 'Jennifer White', growth: '+3' },
  { name: 'Sales', headcount: 32, manager: 'Chris Taylor', growth: '+8' },
];

const directReports = [
  { name: 'John Doe', role: 'Senior Developer', status: 'active', onLeave: false },
  { name: 'Jane Smith', role: 'Tech Lead', status: 'active', onLeave: false },
  { name: 'Mike Chen', role: 'Developer', status: 'active', onLeave: true },
  { name: 'Alex Kim', role: 'Junior Developer', status: 'active', onLeave: false },
];

function OrgNode({ person, level = 0 }: { person: any; level?: number }) {
  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-border pl-4' : ''}`}>
      <div className="flex items-center gap-3 py-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-primary/10 text-primary text-sm">
            {person.name.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium text-foreground">{person.name}</p>
          <p className="text-sm text-muted-foreground">{person.role}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {person.department}
        </Badge>
      </div>
      {person.reports && person.reports.length > 0 && (
        <div className="mt-2">
          {person.reports.map((report: any, index: number) => (
            <OrgNode key={index} person={report} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  return (
    <AppLayout title="Team" subtitle="Organization structure and team management">
      <div className="space-y-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="org-chart">Org Chart</TabsTrigger>
            <TabsTrigger value="my-team">My Team</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Department Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="stat-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Employees</p>
                      <p className="text-3xl font-bold text-foreground">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="stat-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Departments</p>
                      <p className="text-3xl font-bold text-foreground">5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="stat-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">New This Month</p>
                      <p className="text-3xl font-bold text-foreground">+18</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Departments List */}
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
                <CardDescription>Overview of all departments in the organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{dept.name}</p>
                          <p className="text-sm text-muted-foreground">Manager: {dept.manager}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{dept.headcount}</p>
                          <p className="text-xs text-muted-foreground">employees</p>
                        </div>
                        <Badge variant="secondary" className={dept.growth.startsWith('+') ? 'badge-success' : ''}>
                          {dept.growth}
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="org-chart">
            <Card>
              <CardHeader>
                <CardTitle>Organization Chart</CardTitle>
                <CardDescription>Visual representation of the company hierarchy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <OrgNode person={orgStructure.ceo} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-team">
            <Card>
              <CardHeader>
                <CardTitle>My Direct Reports</CardTitle>
                <CardDescription>Team members reporting directly to you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {directReports.map((member, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {member.onLeave && (
                          <Badge variant="outline" className="badge-warning">
                            On Leave
                          </Badge>
                        )}
                        <Badge variant="outline" className="badge-success">
                          Active
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
