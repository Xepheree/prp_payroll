import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';
import EmptyState from '@/components/custom/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { HandCoins, Plus } from 'lucide-react';

interface Employee {
    id: number;
    name: string;
    balance: number | null;
    updated_at: string;
}

interface PageProps {
    employees: Employee[];
}

export default function Index() {
    const { employees } = usePage().props as PageProps;

    const [editingId, setEditingId] = useState<number | null>(null);

    const [editedBalance, setEditedBalance] = useState('');

    const saveBalance = (employeeId: number) => {
        router.patch(
            `/obs/${employeeId}`,
            {
                balance: editedBalance,
            },
            {
                onSuccess: () => {
                    toast.success('Balance updated.');

                    setEditingId(null);
                    setEditedBalance('');
                },
            },
        );
    };

    return (
        <>
            <Head title="Outstanding Balances" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Outstanding Balances
                        </h1>

                        <p className="text-muted-foreground">
                            Employee balances and deductions.
                        </p>
                    </div>

                    <div className="space-x-4">
                        <Button
                            onClick={() => router.visit('/deductions?from=obs')}
                        >
                            <HandCoins className="mr-2 h-4 w-4" />
                            Manage Deductions
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Employee Balances</CardTitle>
                    </CardHeader>

                    <CardContent>
                        {employees.length === 0 ? (
                            <EmptyState
                                title="No Employees Found"
                                description="Create employees before managing outstanding balances."
                            />
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-45 border-r">
                                                Employee
                                            </TableHead>

                                            <TableHead className="w-45 border-r">
                                                Outstanding Balance
                                            </TableHead>

                                            <TableHead className="w-45 border-r">
                                                Last Updated
                                            </TableHead>

                                            <TableHead className="w-45">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {employees.map((employee: Employee) => (
                                            <TableRow key={employee.id}>
                                                <TableCell className="border-r font-medium">
                                                    {employee.name}
                                                </TableCell>

                                                <TableCell className="border-r">
                                                    {editingId ===
                                                    employee.id ? (
                                                        <Input
                                                            type="number"
                                                            value={
                                                                editedBalance
                                                            }
                                                            onChange={(e) =>
                                                                setEditedBalance(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="align-center flex gap-2">
                                                            <span>₱</span>
                                                            {Number(
                                                                employee.transactions_sum_amount ??
                                                                    0,
                                                            ).toLocaleString()}
                                                        </div>
                                                    )}
                                                </TableCell>

                                                <TableCell className="border-r">
                                                    {new Date(
                                                        employee.updated_at,
                                                    ).toLocaleDateString()}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        {editingId ===
                                                        employee.id ? (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        saveBalance(
                                                                            employee.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Save
                                                                </Button>

                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setEditingId(
                                                                            null,
                                                                        );
                                                                        setEditedBalance(
                                                                            '',
                                                                        );
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setEditingId(
                                                                        employee.id,
                                                                    );

                                                                    setEditedBalance(
                                                                        String(
                                                                            employee.balance ??
                                                                                0,
                                                                        ),
                                                                    );
                                                                }}
                                                            >
                                                                Update
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
