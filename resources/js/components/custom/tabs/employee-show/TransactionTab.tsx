import { router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';

function TransactionTab({
    employee,
    filters,
}: {
    employee: any;
    filters: any;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Employee Transactions</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="mb-4 flex gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Start Date
                        </label>

                        <Input
                            type="date"
                            value={filters?.start_date ?? ''}
                            onChange={(e) =>
                                router.get(
                                    window.location.pathname,
                                    {
                                        start_date: e.target.value,
                                        end_date: filters?.end_date,
                                    },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                        replace: true,
                                    },
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            End Date
                        </label>

                        <Input
                            type="date"
                            value={filters?.end_date ?? ''}
                            onChange={(e) =>
                                router.get(
                                    window.location.pathname,
                                    {
                                        start_date: filters?.start_date,
                                        end_date: e.target.value,
                                    },
                                    {
                                        preserveState: true,
                                        preserveScroll: true,
                                        replace: true,
                                    },
                                )
                            }
                        />
                    </div>
                </div>

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
                            employee.transactions.map((transaction: any) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        {formatDateTime(transaction.created_at)}
                                    </TableCell>

                                    <TableCell>
                                        {transaction.description}
                                    </TableCell>

                                    <TableCell
                                        className={
                                            Number(transaction.amount) < 0
                                                ? 'font-medium text-green-400'
                                                : 'font-medium text-red-400'
                                        }
                                    >
                                        {Number(transaction.amount) > 0
                                            ? '- '
                                            : '+ '}
                                        ₱
                                        {Math.abs(
                                            Number(transaction.amount),
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
    );
}

export default TransactionTab;
