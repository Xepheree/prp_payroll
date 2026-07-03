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

function PayrollHistoryTab({ employee }: { employee: any }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payroll History</CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Payroll Period</TableHead>

                            <TableHead>Days</TableHead>

                            <TableHead>Hours</TableHead>

                            <TableHead>Trips</TableHead>

                            <TableHead>Gross Pay</TableHead>

                            <TableHead>Deductions</TableHead>

                            <TableHead>Net Pay</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {employee.payroll_items?.length ? (
                            employee.payroll_items.map((item) => (
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
                                                item.payroll.start_date,
                                            )}
                                        </span>{' '}
                                        →{' '}
                                        <span className="font-medium">
                                            {formatDate(item.payroll.end_date)}
                                        </span>
                                    </TableCell>

                                    <TableCell>{item.days_worked}</TableCell>

                                    <TableCell>{item.work_hours}</TableCell>

                                    <TableCell>{item.delivery_count}</TableCell>

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
                                        ₱{Number(item.net_pay).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="py-8 text-center text-muted-foreground"
                                >
                                    No payroll history found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default PayrollHistoryTab;
