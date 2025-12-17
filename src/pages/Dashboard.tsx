import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  CalendarDays,
  FileText,
  Building2
} from 'lucide-react';

const stats = [
  { 
    title: 'Total Employees', 
    value: '156', 
    change: '+12%', 
    changeType: 'positive',
    icon: Users,
    color: 'text-primary'
  },
  { 
    title: 'On Leave Today', 
    value: '8', 
    change: '5%', 
    changeType: 'neutral',
    icon: Calendar,
    color: 'text-warning'
  },
  { 
    title: 'Pending Approvals', 
    value: '24', 
    change: '-8%', 
    changeType: 'negative',
    icon: Clock,
    color: 'text-destructive'
  },
  { 
    title: 'This Month Hires', 
    value: '7', 
    change: '+25%', 
    changeType: 'positive',
    icon: TrendingUp,
    color: 'text-success'
  },
];

const upcomingHolidays = [
  { name: 'Christmas Day', date: 'Dec 25, 2024' },
  { name: 'New Year', date: 'Jan 1, 2025' },
  { name: 'Republic Day', date: 'Jan 26, 2025' },
];

const recentActivity = [
  { type: 'leave', user: 'Sarah Johnson', action: 'requested sick leave', time: '2 hours ago' },
  { type: 'approval', user: 'John Doe', action: 'approved leave request', time: '4 hours ago' },
  { type: 'join', user: 'Mike Chen', action: 'joined the company', time: '1 day ago' },
  { type: 'policy', user: 'HR Admin', action: 'updated leave policy', time: '2 days ago' },
];

const quickActions = [
  { title: 'Apply Leave', icon: Calendar, href: '/leave' },
  { title: 'View Payslip', icon: FileText, href: '/payslips' },
  { title: 'Team Directory', icon: Users, href: '/employees' },
  { title: 'Organization', icon: Building2, href: '/team' },
];

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Welcome back! Here's what's happening.">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-3 flex items-center text-sm">
                  <Badge 
                    variant="secondary" 
                    className={`font-normal ${
                      stat.changeType === 'positive' ? 'badge-success' : 
                      stat.changeType === 'negative' ? 'badge-destructive' : 
                      'badge-info'
                    }`}
                  >
                    {stat.change}
                  </Badge>
                  <span className="ml-2 text-muted-foreground">vs last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features at your fingertips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-auto justify-start gap-4 p-4 hover:bg-muted/50"
                    asChild
                  >
                    <a href={action.href}>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <action.icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-1 items-center justify-between">
                        <span className="font-medium">{action.title}</span>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Upcoming Holidays
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingHolidays.map((holiday, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">{holiday.name}</p>
                    <p className="text-sm text-muted-foreground">{holiday.date}</p>
                  </div>
                  <Badge variant="secondary">Upcoming</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 py-3 border-b border-border/50 last:border-0">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                    activity.type === 'leave' ? 'bg-warning/10 text-warning' :
                    activity.type === 'approval' ? 'bg-success/10 text-success' :
                    activity.type === 'join' ? 'bg-primary/10 text-primary' :
                    'bg-info/10 text-info'
                  }`}>
                    {activity.type === 'leave' && <Calendar className="h-4 w-4" />}
                    {activity.type === 'approval' && <Clock className="h-4 w-4" />}
                    {activity.type === 'join' && <Users className="h-4 w-4" />}
                    {activity.type === 'policy' && <FileText className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
