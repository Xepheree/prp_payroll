import { Head, usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

interface PayrollItem {
    id: number;

    employee: {
        id: number;
        name: string;
        designation: string;
    };

    days_worked: number;

    work_hours: number;
    overtime_hours: number;
    delivery_count: number;

    basic_pay: number;
    trip_pay: number;
    overtime_pay: number;

    deductions: number;

    gross_pay: number;
    net_pay: number;
}

interface Payroll {
    id: number;

    start_date: string;
    end_date: string;

    status: string;

    items: PayrollItem[];
}

export default function Show() {
    const { payroll } = usePage().props as {
        payroll: Payroll;
    };

    const totalPayroll = payroll.items.reduce(
        (total, item) => total + Number(item.net_pay),
        0,
    );

    return (
        <>
            <Head title="Payroll Details" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Payroll</h1>

                        <p className="text-muted-foreground">
                            {formatDate(payroll.start_date)} to{' '}
                            {formatDate(payroll.end_date)}
                        </p>
                    </div>

                    <Button>Finalize Payroll</Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Payroll Summary</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-sm text-muted-foreground">
                                        Employees
                                    </div>

                                    <div className="text-2xl font-bold">
                                        {payroll.items.length}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-sm text-muted-foreground">
                                        Status
                                    </div>

                                    <div className="text-2xl font-bold capitalize">
                                        {payroll.status}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="text-sm text-muted-foreground">
                                        Total Payroll
                                    </div>

                                    <div className="text-2xl font-bold">
                                        ₱{totalPayroll.toLocaleString()}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Employee Payroll : Next todo: fix the incentives:
                            OT, Trips then the Cash Advances.
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>

                                    <TableHead>Days</TableHead>

                                    <TableHead>Hours</TableHead>

                                    <TableHead>OT</TableHead>

                                    <TableHead>OT Pay</TableHead>

                                    <TableHead>Trips</TableHead>

                                    <TableHead>Trip Pay</TableHead>

                                    <TableHead>Gross</TableHead>

                                    <TableHead>Deductions</TableHead>

                                    <TableHead>Net Pay</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {payroll.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            {item.employee.name}
                                        </TableCell>

                                        <TableCell>
                                            {item.days_worked}
                                        </TableCell>

                                        <TableCell>{item.work_hours}</TableCell>

                                        <TableCell>
                                            {item.overtime_hours}
                                        </TableCell>

                                        <TableCell>
                                            {item.overtime_pay}
                                        </TableCell>

                                        <TableCell>
                                            {item.delivery_count}
                                        </TableCell>

                                        <TableCell>{item.trip_pay}</TableCell>

                                        <TableCell>
                                            ₱
                                            {Number(
                                                item.gross_pay,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell>
                                            ₱
                                            {Number(
                                                item.deductions,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="font-medium">
                                            ₱
                                            {Number(
                                                item.net_pay,
                                            ).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
