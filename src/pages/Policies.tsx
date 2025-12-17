import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Search, 
  CheckCircle, 
  Clock,
  Calendar,
  Shield,
  Monitor,
  BookOpen
} from 'lucide-react';

const policies = [
  {
    id: 1,
    title: 'Annual Leave Policy',
    category: 'leave',
    description: 'Guidelines for annual leave entitlements, application process, and approval workflow.',
    version: 'v2.1',
    updatedAt: 'Dec 15, 2024',
    acknowledged: true,
  },
  {
    id: 2,
    title: 'Remote Work Policy',
    category: 'hr',
    description: 'Rules and guidelines for working remotely, including eligibility and expectations.',
    version: 'v1.3',
    updatedAt: 'Nov 20, 2024',
    acknowledged: true,
  },
  {
    id: 3,
    title: 'IT Security Guidelines',
    category: 'it',
    description: 'Security best practices, password policies, and data protection requirements.',
    version: 'v3.0',
    updatedAt: 'Dec 1, 2024',
    acknowledged: false,
  },
  {
    id: 4,
    title: 'Code of Conduct',
    category: 'hr',
    description: 'Expected professional behavior and ethical standards for all employees.',
    version: 'v1.0',
    updatedAt: 'Jan 1, 2024',
    acknowledged: true,
  },
  {
    id: 5,
    title: 'Expense Reimbursement Policy',
    category: 'hr',
    description: 'Process for submitting and getting approval for business expenses.',
    version: 'v2.0',
    updatedAt: 'Oct 5, 2024',
    acknowledged: false,
  },
  {
    id: 6,
    title: 'Data Privacy Policy',
    category: 'it',
    description: 'Guidelines for handling personal and sensitive data in compliance with regulations.',
    version: 'v1.5',
    updatedAt: 'Sep 15, 2024',
    acknowledged: true,
  },
];

const categoryIcons = {
  leave: Calendar,
  hr: BookOpen,
  it: Monitor,
  general: Shield,
};

const categoryStyles = {
  leave: 'bg-warning/10 text-warning',
  hr: 'bg-primary/10 text-primary',
  it: 'bg-info/10 text-info',
  general: 'bg-muted text-muted-foreground',
};

export default function Policies() {
  const pendingCount = policies.filter(p => !p.acknowledged).length;

  return (
    <AppLayout title="Policies" subtitle="Company policies and guidelines">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Policies</p>
                  <p className="text-3xl font-bold text-foreground">{policies.length}</p>
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
                  <p className="text-sm text-muted-foreground">Acknowledged</p>
                  <p className="text-3xl font-bold text-foreground">{policies.length - pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-3xl font-bold text-foreground">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Policies List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Policy Documents</CardTitle>
                <CardDescription>Review and acknowledge company policies</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search policies..." className="pl-9" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending" className="relative">
                  Pending
                  {pendingCount > 0 && (
                    <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[10px] font-medium text-warning-foreground">
                      {pendingCount}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="leave">Leave</TabsTrigger>
                <TabsTrigger value="hr">HR</TabsTrigger>
                <TabsTrigger value="it">IT</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {policies.map((policy) => {
                  const Icon = categoryIcons[policy.category as keyof typeof categoryIcons];
                  return (
                    <div
                      key={policy.id}
                      className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryStyles[policy.category as keyof typeof categoryStyles]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{policy.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {policy.version}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {policy.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Updated: {policy.updatedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:shrink-0">
                        {policy.acknowledged ? (
                          <Badge variant="outline" className="badge-success gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Acknowledged
                          </Badge>
                        ) : (
                          <Button size="sm">
                            Acknowledge
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {policies.filter(p => !p.acknowledged).map((policy) => {
                  const Icon = categoryIcons[policy.category as keyof typeof categoryIcons];
                  return (
                    <div
                      key={policy.id}
                      className="flex flex-col gap-4 rounded-lg border border-warning/30 bg-warning/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryStyles[policy.category as keyof typeof categoryStyles]}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{policy.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {policy.version}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {policy.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:shrink-0">
                        <Button size="sm">
                          Review & Acknowledge
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
