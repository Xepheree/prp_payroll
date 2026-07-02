import { Head, router, usePage } from '@inertiajs/react';
import { HandCoins, Plus } from 'lucide-react';
import { useState } from 'react';
import CreatePayrollModal from '@/components/custom/modals/payroll/CreatePayrollModal';
import { Badge } from '@/components/ui/badge';
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
import EmptyState from '@/components/custom/EmptyState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Index() {
    const [openCreate, setOpenCreate] = useState(false);
    const { payrolls, availableAttendances, filters } = usePage()
        .props as PageProps;

    const [dateFilters, setDateFilters] = useState({
        start_date: filters?.start_date ?? '',
        end_date: filters?.end_date ?? '',
    });

    return (
        <>
            <Head title="Payroll" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Payroll</h1>
                        <p className="text-muted-foreground">
                            Manage payroll periods and employee compensation
                        </p>
                    </div>

                    <div className="space-x-4">
                        <Button
                            onClick={() =>
                                router.visit('/deductions?from=payroll')
                            }
                        >
                            <HandCoins className="mr-2 h-4 w-4" />
                            Manage Deductions
                        </Button>
                        <Button onClick={() => setOpenCreate(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Payroll
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Payroll Records</CardTitle>

                        <div className="flex items-end gap-4">
                            <div>
                                <Label>From</Label>
                                <Input
                                    type="date"
                                    value={dateFilters.start_date}
                                    onChange={(e) =>
                                        setDateFilters({
                                            ...dateFilters,
                                            start_date: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div>
                                <Label>To</Label>
                                <Input
                                    type="date"
                                    value={dateFilters.end_date}
                                    onChange={(e) =>
                                        setDateFilters({
                                            ...dateFilters,
                                            end_date: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <Button
                                onClick={() =>
                                    router.get(
                                        '/payroll',
                                        {
                                            start_date: dateFilters.start_date,
                                            end_date: dateFilters.end_date,
                                        },
                                        {
                                            preserveState: true,
                                            replace: true,
                                        },
                                    )
                                }
                            >
                                Filter
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setDateFilters({
                                        start_date: '',
                                        end_date: '',
                                    });

                                    router.get('/payroll');
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {payrolls.length === 0 ? (
                            <EmptyState
                                title="No Payroll Records Found"
                                description="Create your first payroll period."
                                actionLabel="New Payroll"
                                onAction={() => setOpenCreate(true)}
                            />
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>
                                                Payroll Period
                                            </TableHead>
                                            <TableHead>Employees</TableHead>
                                            <TableHead>Total Payroll</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {payrolls.map((payroll, index) => (
                                            <TableRow
                                                key={payroll.id}
                                                onClick={() =>
                                                    router.visit(
                                                        `/payroll/${payroll.id}`,
                                                    )
                                                }
                                                className={`cursor-pointer border-r font-medium ${
                                                    index === 0
                                                        ? 'border-l-4 border-l-green-500 bg-green-500/10 hover:bg-green-500/20'
                                                        : ''
                                                }`}
                                            >
                                                <TableCell>
                                                    {formatDate(
                                                        payroll.start_date,
                                                    )}{' '}
                                                    -{' '}
                                                    {formatDate(
                                                        payroll.end_date,
                                                    )}
                                                </TableCell>

                                                <TableCell>-</TableCell>

                                                <TableCell>₱0.00</TableCell>

                                                <TableCell>
                                                    {getPayrollStatusBadge(
                                                        payroll.status,
                                                    )}
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

            <CreatePayrollModal
                open={openCreate}
                setOpen={setOpenCreate}
                attendances={availableAttendances}
            />
        </>
    );
}

export const getPayrollStatusBadge = (status: string) => {
    switch (status) {
        case 'paid':
            return <Badge className="bg-green-500">Paid</Badge>;

        case 'finalized':
            return <Badge className="bg-blue-500">Finalized</Badge>;

        case 'draft':
            return <Badge className="bg-yellow-500">Draft</Badge>;

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};
