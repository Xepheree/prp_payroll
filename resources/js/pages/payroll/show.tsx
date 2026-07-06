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

import { router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { exportPayslip } from '@/lib/pdf/payslip';
import { FileText } from 'lucide-react';
import { exportBatchPayslips } from '@/lib/pdf/batchPayslip';

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
    const { payroll, items } = usePage().props as {
        payroll: Payroll;
        items: PayrollItem[];
    };

    const totalPayroll = items.reduce(
        (total, item) => total + Number(item.net_pay),
        0,
    );

    const [openFinalize, setOpenFinalize] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [balanceRecoveries, setBalanceRecoveries] = useState<
        Record<number, number>
    >({});

    // const finalizePayroll = () => {
    //     router.post(
    //         `/payroll/${payroll.id}/finalize`,
    //         {
    //             balance_recoveries: balanceRecoveries,
    //         },
    //         {
    //             preserveScroll: true,

    //             onSuccess: () => {
    //                 toast.success('Payroll finalized successfully.');
    //                 setOpenFinalize(false);
    //                 setConfirmed(false);
    //             },

    //             onError: (errors) => {
    //                 const firstError = Object.values(errors)[0];

    //                 if (firstError) {
    //                     toast.error(firstError as string);
    //                 }
    //             },
    //         },
    //     );
    // };

    const finalizePayroll = () => {
        console.log(balanceRecoveries);

        router.post(
            `/payroll/${payroll.id}/finalize`,
            {
                balance_recoveries: balanceRecoveries,
            },
            {
                preserveScroll: true,
            },
        );
    };

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

                    {payroll.status === 'draft' ? (
                        <Button onClick={() => setOpenFinalize(true)}>
                            Finalize Payroll
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                exportBatchPayslips(
                                    items,
                                    payroll.start_date,
                                    payroll.end_date,
                                )
                            }
                        >
                            Print Payslips
                        </Button>
                    )}
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
                                        {items.length}
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
                        <CardTitle>Employee Payroll</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="border-r">
                                        Employee
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Days
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Hours
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        OT
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        OT Pay
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Trips
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Trip Pay
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Gross
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Outstanding
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Recover
                                    </TableHead>

                                    <TableHead className="border-r text-center">
                                        Salary Released
                                    </TableHead>

                                    {/* <TableHead>Net Pay</TableHead> */}

                                    {payroll.status === 'finalized' && (
                                        <TableHead>Actions</TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="border-r font-medium">
                                            {item.employee.name}

                                            <div className="text-xs text-muted-foreground">
                                                {`${
                                                    item.employee.designation
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                    item.employee.designation.slice(
                                                        1,
                                                    )
                                                } @ ₱${Number(item.employee.rate)} /day`}
                                            </div>
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            {Number(
                                                item.days_worked,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            {Number(
                                                item.work_hours,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            {Number(
                                                item.overtime_hours,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            ₱
                                            {Number(
                                                item.overtime_pay,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            {item.delivery_count}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            ₱
                                            {Number(
                                                item.trip_pay,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            ₱
                                            {Number(
                                                item.gross_pay,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            ₱
                                            {Number(
                                                item.outstanding_balance,
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            <TableCell className="text-center">
                                                {payroll.status === 'draft' ? (
                                                    <Input
                                                        className="border-r text-center"
                                                        type="number"
                                                        placeholder="0"
                                                        min={0}
                                                        max={Math.min(
                                                            Number(
                                                                item.outstanding_balance,
                                                            ),
                                                            Number(
                                                                item.net_pay,
                                                            ),
                                                        )}
                                                        value={
                                                            balanceRecoveries[
                                                                item.employee.id
                                                            ] ?? ''
                                                        }
                                                        // onChange={(e) => {
                                                        //     const value =
                                                        //         Number(
                                                        //             e.target
                                                        //                 .value,
                                                        //         );

                                                        //     setBalanceRecoveries(
                                                        //         (current) => ({
                                                        //             ...current,
                                                        //             [item
                                                        //                 .employee
                                                        //                 .id]:
                                                        //                 Math.min(
                                                        //                     Math.max(
                                                        //                         value,
                                                        //                         0,
                                                        //                     ),
                                                        //                     Math.min(
                                                        //                         Number(
                                                        //                             item.outstanding_balance,
                                                        //                         ),
                                                        //                         Number(
                                                        //                             item.net_pay,
                                                        //                         ),
                                                        //                     ),
                                                        //                 ),
                                                        //         }),
                                                        //     );
                                                        // }}

                                                        onChange={(e) => {
                                                            const value =
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                );

                                                            console.log(
                                                                'changed',
                                                                item.employee
                                                                    .id,
                                                                value,
                                                            );

                                                            setBalanceRecoveries(
                                                                (current) => ({
                                                                    ...current,
                                                                    [item
                                                                        .employee
                                                                        .id]:
                                                                        value,
                                                                }),
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="text-center">
                                                        ₱
                                                        {Number(
                                                            item.balance_recovery,
                                                        ).toLocaleString()}
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableCell>

                                        <TableCell className="border-r text-center">
                                            ₱
                                            {payroll.status === 'draft'
                                                ? (
                                                      Number(item.net_pay) -
                                                      (balanceRecoveries[
                                                          item.employee.id
                                                      ] ?? 0)
                                                  ).toLocaleString()
                                                : Number(
                                                      item.salary_released,
                                                  ).toLocaleString()}
                                        </TableCell>

                                        {/* <TableCell className="font-medium">
                                            ₱
                                            {Number(
                                                item.net_pay,
                                            ).toLocaleString()}
                                        </TableCell> */}

                                        {payroll.status === 'finalized' && (
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            exportPayslip(
                                                                item,
                                                                payroll.start_date,
                                                                payroll.end_date,
                                                            )
                                                        }
                                                    >
                                                        <FileText className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={openFinalize}
                onOpenChange={(open) => {
                    setOpenFinalize(open);

                    if (!open) {
                        setConfirmed(false);
                    }
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Finalize Payroll?</AlertDialogTitle>

                        <AlertDialogDescription>
                            Finalizing this payroll will create permanent
                            payroll records, assign all included trips and
                            deductions to this payroll, and prevent future
                            changes from affecting these payroll amounts. This
                            action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox
                            id="confirm-finalize"
                            checked={confirmed}
                            onCheckedChange={(checked) =>
                                setConfirmed(Boolean(checked))
                            }
                        />

                        <Label htmlFor="confirm-finalize">
                            I have reviewed this payroll and understand that
                            finalizing will lock its values.
                        </Label>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                            disabled={!confirmed}
                            onClick={finalizePayroll}
                        >
                            Finalize Payroll
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
