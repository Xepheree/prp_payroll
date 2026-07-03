import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '@/components/ui/table';
import { formatDateTime } from '@/lib/utils';

function TransactionTab({ employee }: { employee: any }) {
    return (
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
                                                ? 'font-medium text-red-400'
                                                : 'font-medium text-green-400'
                                        }
                                    >
                                        {Number(transaction.amount) > 0
                                            ? '+ '
                                            : '- '}
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
