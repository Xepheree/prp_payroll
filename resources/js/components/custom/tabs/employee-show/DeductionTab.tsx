import { Badge } from '@/components/ui/badge';
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

function DeductionTab({ employee }: { employee: any }) {
    return (
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
                            employee.deductions.map((deduction) => (
                                <TableRow key={deduction.id}>
                                    <TableCell>
                                        {formatDate(deduction.date)}
                                    </TableCell>

                                    <TableCell className="capitalize">
                                        {deduction.type.replaceAll('_', ' ')}
                                    </TableCell>

                                    <TableCell className="font-medium text-red-500">
                                        ₱
                                        {Number(
                                            deduction.amount,
                                        ).toLocaleString()}
                                    </TableCell>

                                    <TableCell>
                                        {deduction.remarks || '-'}
                                    </TableCell>

                                    <TableCell>
                                        {deduction.payroll_id ? (
                                            <Badge className="bg-green-500 hover:bg-green-600">
                                                Included in Payroll
                                            </Badge>
                                        ) : deduction.added_to_balance ? (
                                            <Badge className="bg-orange-500 hover:bg-orange-600">
                                                Added to Balance
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Pending
                                            </Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
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
    );
}

export default DeductionTab;
