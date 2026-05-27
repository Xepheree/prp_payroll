import { Head, Link, usePage } from '@inertiajs/react';
import { ArchiveX, Check } from 'lucide-react';
import { useState } from 'react';

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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Index() {
    const { employees, flash } = usePage().props as PageProps;

    return (
        <>
            <Head title="Employees" />

            <div className="m-4">
                {flash?.message && (
                    <div className="m-4">
                        <Alert>
                            <Check className="h-4 w-4" />
                            <AlertTitle>Notification</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    </div>
                )}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Employee Masterlist</CardTitle>

                        <Link href="/employees/create">
                            <Button>Add Employee</Button>
                        </Link>
                    </CardHeader>

                    <CardContent>
                        {employees.length === 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-4 py-16 text-center">
                                <ArchiveX className="size-8 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    No employees found.
                                </p>

                                <Link href="/employees/create">
                                    <Button>Add an Employee</Button>
                                </Link>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>

                                        <TableHead>Designation</TableHead>

                                        <TableHead>Monthly Rate</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {employees.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                {employee.name}
                                            </TableCell>

                                            <TableCell>
                                                {employee.designation}
                                            </TableCell>

                                            <TableCell>
                                                ₱
                                                {employee.rate.toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Employee Masterlist',
            href: '/employees',
        },
    ],
};
