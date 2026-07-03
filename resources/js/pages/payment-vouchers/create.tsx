import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Employee {
    id: number;
    name: string;
    designation: string;
    outstanding: number;
}

interface Props {
    employees: Employee[];
}

export default function Create({ employees }: Props) {
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    const toggleEmployee = (id: number) => {
        setSelectedEmployees((current) =>
            current.includes(id)
                ? current.filter((employeeId) => employeeId !== id)
                : [...current, id],
        );
    };

    const totalSelected = employees
        .filter((employee) => selectedEmployees.includes(employee.id))
        .reduce(
            (total, employee) => total + Math.abs(Number(employee.outstanding)),
            0,
        );

    return (
        <>
            <Head title="Generate Payment Voucher" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Generate Payment Voucher
                        </h1>

                        <p className="text-muted-foreground">
                            Select employees whose outstanding salary will be
                            released.
                        </p>
                    </div>

                    <Button
                        disabled={selectedEmployees.length === 0}
                        onClick={() =>
                            router.post('/payment-vouchers/preview', {
                                employee_ids: selectedEmployees,
                            })
                        }
                    >
                        Next
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Outstanding Employees</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-14" />

                                    <TableHead>Employee</TableHead>

                                    <TableHead>Designation</TableHead>

                                    <TableHead className="text-right">
                                        Outstanding
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {employees.length ? (
                                    employees.map((employee) => (
                                        <TableRow
                                            key={employee.id}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                toggleEmployee(employee.id)
                                            }
                                        >
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedEmployees.includes(
                                                        employee.id,
                                                    )}
                                                />
                                            </TableCell>

                                            <TableCell className="font-medium">
                                                {employee.name}
                                            </TableCell>

                                            <TableCell>
                                                {employee.designation}
                                            </TableCell>

                                            <TableCell className="text-right font-semibold text-green-600">
                                                ₱
                                                {Math.abs(
                                                    Number(
                                                        employee.outstanding,
                                                    ),
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-8 text-center text-muted-foreground"
                                        >
                                            No employees have outstanding salary
                                            to be paid.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Summary</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground">
                                Employees Selected
                            </p>

                            <p className="text-2xl font-bold">
                                {selectedEmployees.length}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                                Total Payment
                            </p>

                            <p className="text-2xl font-bold text-green-600">
                                ₱{totalSelected.toLocaleString()}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
