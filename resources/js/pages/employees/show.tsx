import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BadgePesoSign,
    PhilippinePeso,
    Truck,
    Wallet,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { formatDate, formatDateTime } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function Show() {
    const { employee } = usePage().props as {
        employee: Employee;
    };
    console.log(employee);

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

                <Tabs defaultValue="transactions" className="w-full">
                    <TabsList>
                        <TabsTrigger value="transactions">
                            Transactions
                        </TabsTrigger>

                        <TabsTrigger value="driven">Driven Trips</TabsTrigger>

                        <TabsTrigger value="assisted">
                            Assisted Trips
                        </TabsTrigger>

                        <TabsTrigger value="payroll">
                            Payroll History
                        </TabsTrigger>

                        <TabsTrigger value="deductions">Deductions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="transactions">
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
                                            employee.transactions.map(
                                                (transaction) => (
                                                    <TableRow
                                                        key={transaction.id}
                                                    >
                                                        <TableCell>
                                                            {formatDateTime(
                                                                transaction.created_at,
                                                            )}
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                transaction.description
                                                            }
                                                        </TableCell>

                                                        <TableCell
                                                            className={
                                                                Number(
                                                                    transaction.amount,
                                                                ) < 0
                                                                    ? 'font-medium text-red-400'
                                                                    : 'font-medium text-green-400'
                                                            }
                                                        >
                                                            {Number(
                                                                transaction.amount,
                                                            ) > 0
                                                                ? '+ '
                                                                : '- '}
                                                            ₱
                                                            {Math.abs(
                                                                Number(
                                                                    transaction.amount,
                                                                ),
                                                            ).toLocaleString()}
                                                        </TableCell>
                                                    </TableRow>
                                                ),
                                            )
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
                    </TabsContent>

                    <TabsContent value="driven">
                        <TabsContent value="driven">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Driven Trips</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Truck</TableHead>
                                                <TableHead>Trip Type</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {employee.driven_trips.length ? (
                                                employee.driven_trips.map(
                                                    (trip) => (
                                                        <TableRow key={trip.id}>
                                                            <TableCell>
                                                                {formatDate(
                                                                    trip.trip_date,
                                                                )}
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    trip.truck
                                                                        .alias
                                                                }
                                                            </TableCell>

                                                            <TableCell className="capitalize">
                                                                {trip.trip_type}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                        className="py-8 text-center text-muted-foreground"
                                                    >
                                                        No driven trips.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </TabsContent>

                    <TabsContent value="assisted">
                        <TabsContent value="assisted">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Assisted Trips</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>Truck</TableHead>
                                                <TableHead>Trip Type</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {employee.assisted_trips.length ? (
                                                employee.assisted_trips.map(
                                                    (trip) => (
                                                        <TableRow key={trip.id}>
                                                            <TableCell>
                                                                {formatDate(
                                                                    trip.trip_date,
                                                                )}
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    trip.truck
                                                                        .alias
                                                                }
                                                            </TableCell>

                                                            <TableCell className="capitalize">
                                                                {trip.trip_type}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={3}
                                                        className="py-8 text-center text-muted-foreground"
                                                    >
                                                        No driven trips.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </TabsContent>

                    <TabsContent value="payroll">
                        <TabsContent value="payroll">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Payroll History</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    Payroll Period
                                                </TableHead>

                                                <TableHead>Days</TableHead>

                                                <TableHead>Hours</TableHead>

                                                <TableHead>Trips</TableHead>

                                                <TableHead>Gross Pay</TableHead>

                                                <TableHead>
                                                    Deductions
                                                </TableHead>

                                                <TableHead>Net Pay</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {employee.payroll_items?.length ? (
                                                employee.payroll_items.map(
                                                    (item) => (
                                                        <TableRow
                                                            key={item.id}
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                router.visit(
                                                                    `/payroll/${item.payroll.id}`,
                                                                )
                                                            }
                                                        >
                                                            <TableCell>
                                                                <span className="font-medium">
                                                                    {formatDate(
                                                                        item
                                                                            .payroll
                                                                            .start_date,
                                                                    )}
                                                                </span>{' '}
                                                                →{' '}
                                                                <span className="font-medium">
                                                                    {formatDate(
                                                                        item
                                                                            .payroll
                                                                            .end_date,
                                                                    )}
                                                                </span>
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    item.days_worked
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    item.work_hours
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                {
                                                                    item.delivery_count
                                                                }
                                                            </TableCell>

                                                            <TableCell>
                                                                ₱
                                                                {Number(
                                                                    item.gross_pay,
                                                                ).toLocaleString()}
                                                            </TableCell>

                                                            <TableCell className="text-red-500">
                                                                ₱
                                                                {Number(
                                                                    item.deductions,
                                                                ).toLocaleString()}
                                                            </TableCell>

                                                            <TableCell className="font-semibold text-green-600">
                                                                ₱
                                                                {Number(
                                                                    item.net_pay,
                                                                ).toLocaleString()}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={7}
                                                        className="py-8 text-center text-muted-foreground"
                                                    >
                                                        No payroll history
                                                        found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </TabsContent>

                    <TabsContent value="deductions">
                        <TabsContent value="deductions">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Deductions</CardTitle>
                                </CardHeader>

                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>

                                                <TableHead>Type</TableHead>

                                                <TableHead>Amount</TableHead>

                                                <TableHead>Remarks</TableHead>

                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {employee.deductions?.length ? (
                                                employee.deductions.map(
                                                    (deduction) => (
                                                        <TableRow
                                                            key={deduction.id}
                                                        >
                                                            <TableCell>
                                                                {formatDate(
                                                                    deduction.date,
                                                                )}
                                                            </TableCell>

                                                            <TableCell className="capitalize">
                                                                {deduction.type.replaceAll(
                                                                    '_',
                                                                    ' ',
                                                                )}
                                                            </TableCell>

                                                            <TableCell className="font-medium text-red-500">
                                                                ₱
                                                                {Number(
                                                                    deduction.amount,
                                                                ).toLocaleString()}
                                                            </TableCell>

                                                            <TableCell>
                                                                {deduction.remarks ||
                                                                    '-'}
                                                            </TableCell>

                                                            <TableCell>
                                                                {deduction.payroll_id ? (
                                                                    <Badge className="bg-green-500 hover:bg-green-600">
                                                                        Included
                                                                        in
                                                                        Payroll
                                                                    </Badge>
                                                                ) : deduction.added_to_balance ? (
                                                                    <Badge className="bg-orange-500 hover:bg-orange-600">
                                                                        Added to
                                                                        Balance
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge variant="secondary">
                                                                        Pending
                                                                    </Badge>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    ),
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={5}
                                                        className="py-8 text-center text-muted-foreground"
                                                    >
                                                        No deductions found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
