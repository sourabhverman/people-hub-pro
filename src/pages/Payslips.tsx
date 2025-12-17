import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Download, FileText, TrendingUp, Wallet, Building } from 'lucide-react';

const payslips = [
  { month: 'December 2024', basic: 50000, hra: 20000, allowances: 10000, deductions: 8000, net: 72000, status: 'paid' },
  { month: 'November 2024', basic: 50000, hra: 20000, allowances: 10000, deductions: 8000, net: 72000, status: 'paid' },
  { month: 'October 2024', basic: 50000, hra: 20000, allowances: 10000, deductions: 8000, net: 72000, status: 'paid' },
  { month: 'September 2024', basic: 48000, hra: 19200, allowances: 9600, deductions: 7680, net: 69120, status: 'paid' },
  { month: 'August 2024', basic: 48000, hra: 19200, allowances: 9600, deductions: 7680, net: 69120, status: 'paid' },
];

const summaryCards = [
  { title: 'Current Salary', value: '₹72,000', subtitle: 'Net monthly', icon: Wallet, color: 'text-primary' },
  { title: 'Annual CTC', value: '₹9,60,000', subtitle: 'Total package', icon: TrendingUp, color: 'text-success' },
  { title: 'YTD Earnings', value: '₹8,40,000', subtitle: 'This financial year', icon: Building, color: 'text-info' },
];

export default function Payslips() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppLayout title="Payslips" subtitle="View and download your salary details">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {summaryCards.map((card) => (
            <Card key={card.title} className="stat-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-muted ${card.color}`}>
                    <card.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Latest Payslip Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>December 2024 Payslip</CardTitle>
                <CardDescription>Your latest salary breakdown</CardDescription>
              </div>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Earnings */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  Earnings
                </h4>
                <div className="space-y-3 rounded-lg border p-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Basic Salary</span>
                    <span className="font-medium">{formatCurrency(50000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">House Rent Allowance</span>
                    <span className="font-medium">{formatCurrency(20000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Other Allowances</span>
                    <span className="font-medium">{formatCurrency(10000)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Gross Earnings</span>
                    <span className="font-bold text-success">{formatCurrency(80000)}</span>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-destructive" />
                  Deductions
                </h4>
                <div className="space-y-3 rounded-lg border p-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provident Fund</span>
                    <span className="font-medium">{formatCurrency(6000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Professional Tax</span>
                    <span className="font-medium">{formatCurrency(200)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Income Tax (TDS)</span>
                    <span className="font-medium">{formatCurrency(1800)}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total Deductions</span>
                    <span className="font-bold text-destructive">{formatCurrency(8000)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Pay */}
            <div className="mt-6 rounded-xl gradient-bg p-6 text-center">
              <p className="text-sm text-primary-foreground/80">Net Pay</p>
              <p className="text-4xl font-bold text-primary-foreground">{formatCurrency(72000)}</p>
              <p className="text-sm text-primary-foreground/60 mt-1">Credited on 1st January 2025</p>
            </div>
          </CardContent>
        </Card>

        {/* Payslip History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Payslip History</CardTitle>
                <CardDescription>View and download previous payslips</CardDescription>
              </div>
              <Select defaultValue="2024">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Basic</TableHead>
                  <TableHead>Allowances</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((payslip, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{payslip.month}</TableCell>
                    <TableCell>{formatCurrency(payslip.basic)}</TableCell>
                    <TableCell>{formatCurrency(payslip.hra + payslip.allowances)}</TableCell>
                    <TableCell className="text-destructive">-{formatCurrency(payslip.deductions)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(payslip.net)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="badge-success">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
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
