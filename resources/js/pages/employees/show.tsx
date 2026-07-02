import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BadgePesoSign,
    PhilippinePeso,
    Truck,
    Wallet,
} from 'lucide-react';

import {
    getEmployeeDesignationBadge,
    getEmployeeStatusBadge,
} from '@/pages/employees';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Show() {
    const { employee } = usePage().props as {
        employee: Employee;
    };

    console.log(employee.transactions);

    return (
        <>
            <Head title={employee.name} />

            <div className="space-y-6 p-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-8">
                            <Avatar className="h-40 w-40 rounded-lg border">
                                <AvatarImage
                                    src={
                                        employee.image
                                            ? `/storage/${employee.image}`
                                            : '/images/employee_placeholder.png'
                                    }
                                />

                                <AvatarFallback>
                                    {employee.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h2 className="text-3xl font-bold">
                                    {employee.name}
                                </h2>

                                <p className="text-lg text-muted-foreground">
                                    {employee.designation}
                                </p>

                                <div className="mt-4 flex gap-2">
                                    {getEmployeeDesignationBadge(
                                        employee.designation,
                                    )}

                                    {getEmployeeStatusBadge(employee.status)}
                                </div>

                                {employee.description && (
                                    <>
                                        <Separator className="my-6" />

                                        <div>
                                            <h3 className="font-semibold">
                                                Description
                                            </h3>

                                            <p className="mt-2 text-muted-foreground">
                                                {employee.description}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Daily Rate
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.rate.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        OT Rate
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.ot_rate.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Trip Rate
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.trip_rate.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Current Balance
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.balance.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Employee Transactions</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {employee.transactions?.length ? (
                                    employee.transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                {formatDateTime(
                                                    transaction.created_at,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {transaction.description}
                                            </TableCell>

                                            <TableCell>
                                                ₱
                                                {Number(
                                                    transaction.amount,
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
