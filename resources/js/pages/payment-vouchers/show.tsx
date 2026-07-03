import { Head, router } from '@inertiajs/react';

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

interface Employee {
    id: number;
    name: string;
    designation: string;
}

interface Transaction {
    id: number;
    description: string;
    amount: number;
    employee: Employee;
}

interface VoucherItem {
    id: number;
    transaction: Transaction;
}

interface Voucher {
    id: number;
    voucher_number: string;
    payment_date: string;
    payment_method: string;
    remarks: string | null;
    items: VoucherItem[];
}

export default function Show({ voucher }: { voucher: Voucher }) {
    const groupedEmployees = voucher.items.reduce(
        (groups, item) => {
            const employeeId = item.transaction.employee.id;

            if (!groups[employeeId]) {
                groups[employeeId] = {
                    employee: item.transaction.employee,
                    transactions: [],
                };
            }

            groups[employeeId].transactions.push(item.transaction);

            return groups;
        },
        {} as Record<
            number,
            {
                employee: Employee;
                transactions: Transaction[];
            }
        >,
    );

    const employees = Object.values(groupedEmployees);

    const grandTotal = employees.reduce((total, employee) => {
        return (
            total +
            employee.transactions.reduce(
                (subtotal, transaction) =>
                    subtotal + Math.abs(Number(transaction.amount)),
                0,
            )
        );
    }, 0);

    return (
        <>
            <Head title={voucher.voucher_number} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Payment Voucher</h1>

                        <p className="text-muted-foreground">
                            {voucher.voucher_number}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => router.visit('/payment-vouchers')}
                        >
                            Back
                        </Button>

                        <Button onClick={() => window.print()}>Print</Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Voucher Information</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Voucher No.
                                </p>

                                <p className="font-semibold">
                                    {voucher.voucher_number}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Payment Date
                                </p>

                                <p className="font-semibold">
                                    {formatDate(voucher.payment_date)}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Method
                                </p>

                                <p className="font-semibold">
                                    {voucher.payment_method}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Grand Total
                                </p>

                                <p className="text-xl font-bold text-green-600">
                                    ₱{grandTotal.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {voucher.remarks && (
                            <div className="mt-6">
                                <p className="text-sm text-muted-foreground">
                                    Remarks
                                </p>

                                <p>{voucher.remarks}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {employees.map(({ employee, transactions }) => {
                    const subtotal = transactions.reduce(
                        (total, transaction) =>
                            total + Math.abs(Number(transaction.amount)),
                        0,
                    );

                    return (
                        <Card key={employee.id}>
                            <CardHeader>
                                <CardTitle>
                                    {employee.name}

                                    <span className="ml-2 text-base font-normal text-muted-foreground">
                                        {employee.designation}
                                    </span>
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Description</TableHead>

                                            <TableHead className="text-right">
                                                Amount
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {transactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>
                                                    {transaction.description}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    ₱
                                                    {Math.abs(
                                                        Number(
                                                            transaction.amount,
                                                        ),
                                                    ).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        <TableRow>
                                            <TableCell className="font-bold">
                                                Subtotal
                                            </TableCell>

                                            <TableCell className="text-right text-lg font-bold">
                                                ₱{subtotal.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    );
                })}

                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between text-2xl font-bold">
                            <span>Grand Total</span>

                            <span>₱{grandTotal.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Signatories</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="mt-12 grid grid-cols-3 gap-12 text-center">
                            <div>
                                <div className="border-t pt-2">Prepared By</div>
                            </div>

                            <div>
                                <div className="border-t pt-2">Approved By</div>
                            </div>

                            <div>
                                <div className="border-t pt-2">Received By</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
