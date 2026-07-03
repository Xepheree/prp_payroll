import { Head, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

interface Transaction {
    id: number;
    description: string;
    amount: number;
    created_at: string;
}

interface Employee {
    id: number;
    name: string;
    designation: string;
    transactions: Transaction[];
}

interface Props {
    employees: Employee[];
}

export default function Preview({ employees }: Props) {
    const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
        employees.flatMap((employee) =>
            employee.transactions.map((transaction) => transaction.id),
        ),
    );

    const toggleTransaction = (id: number) => {
        setSelectedTransactions((current) =>
            current.includes(id)
                ? current.filter((transactionId) => transactionId !== id)
                : [...current, id],
        );
    };

    const grandTotal = useMemo(() => {
        return employees.reduce((total, employee) => {
            return (
                total +
                employee.transactions
                    .filter((transaction) =>
                        selectedTransactions.includes(transaction.id),
                    )
                    .reduce(
                        (subtotal, transaction) =>
                            subtotal + Math.abs(Number(transaction.amount)),
                        0,
                    )
            );
        }, 0);
    }, [employees, selectedTransactions]);

    return (
        <>
            <Head title="Payment Voucher Preview" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Payment Voucher Preview
                        </h1>

                        <p className="text-muted-foreground">
                            Review the transactions that will be included in
                            this payment voucher.
                        </p>
                    </div>

                    <Button
                        onClick={() =>
                            router.post('/payment-vouchers', {
                                transaction_ids: selectedTransactions,
                                payment_method: 'Cash',
                                remarks: '',
                            })
                        }
                    >
                        Generate Payment Voucher
                    </Button>
                </div>

                {employees.map((employee) => {
                    const subtotal = employee.transactions
                        .filter((transaction) =>
                            selectedTransactions.includes(transaction.id),
                        )
                        .reduce(
                            (total, transaction) =>
                                total + Math.abs(Number(transaction.amount)),
                            0,
                        );

                    return (
                        <Card key={employee.id}>
                            <CardHeader>
                                <CardTitle>
                                    {employee.name}
                                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                                        {employee.designation}
                                    </span>
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <Table>
                                    <TableBody>
                                        {employee.transactions.map(
                                            (transaction) => (
                                                <TableRow
                                                    key={transaction.id}
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        toggleTransaction(
                                                            transaction.id,
                                                        )
                                                    }
                                                >
                                                    <TableCell className="w-12">
                                                        <Checkbox
                                                            checked={selectedTransactions.includes(
                                                                transaction.id,
                                                            )}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        {
                                                            transaction.description
                                                        }
                                                    </TableCell>

                                                    <TableCell className="text-right font-medium">
                                                        ₱
                                                        {Math.abs(
                                                            Number(
                                                                transaction.amount,
                                                            ),
                                                        ).toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            ),
                                        )}

                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                <strong>Subtotal</strong>
                                            </TableCell>

                                            <TableCell className="text-right font-bold">
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
                    <CardHeader>
                        <CardTitle>Grand Total</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between">
                        <div className="text-muted-foreground">
                            Selected Transactions
                        </div>

                        <div className="text-3xl font-bold text-green-600">
                            ₱{grandTotal.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
