import { Head, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

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

interface PaymentVoucher {
    id: number;

    voucher_number: string;

    payment_date: string;

    payment_method: string;

    status: 'draft' | 'released' | 'cancelled';

    employees_count: number;

    total_amount: number;
}

export default function Index() {
    const { vouchers } = usePage().props as {
        vouchers: PaymentVoucher[];
    };

    return (
        <>
            <Head title="Payment Vouchers" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Payment Vouchers</h1>

                        <p className="text-muted-foreground">
                            Manage employee salary payment vouchers.
                        </p>
                    </div>

                    <Button
                        onClick={() => router.visit('/payment-vouchers/create')}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Voucher
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Payment Vouchers</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Voucher No.</TableHead>

                                    <TableHead>Payment Date</TableHead>

                                    <TableHead>Employees</TableHead>

                                    <TableHead>Total</TableHead>

                                    <TableHead>Method</TableHead>

                                    <TableHead>Status</TableHead>

                                    <TableHead />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {vouchers.length ? (
                                    vouchers.map((voucher) => (
                                        <TableRow
                                            key={voucher.id}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                router.visit(
                                                    `/payment-vouchers/${voucher.id}`,
                                                )
                                            }
                                        >
                                            <TableCell className="font-medium">
                                                {voucher.voucher_number}
                                            </TableCell>

                                            <TableCell>
                                                {formatDate(
                                                    voucher.payment_date,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                {voucher.employees_count}
                                            </TableCell>

                                            <TableCell>
                                                ₱
                                                {Number(
                                                    voucher.total_amount,
                                                ).toLocaleString()}
                                            </TableCell>

                                            <TableCell className="capitalize">
                                                {voucher.payment_method}
                                            </TableCell>

                                            <TableCell>
                                                {getVoucherStatusBadge(
                                                    voucher.status,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        e.stopPropagation();

                                                        router.visit(
                                                            `/payment-vouchers/${voucher.id}`,
                                                        );
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="py-10 text-center text-muted-foreground"
                                        >
                                            No payment vouchers found.
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

function getVoucherStatusBadge(status: string) {
    switch (status) {
        case 'released':
            return (
                <Badge className="bg-green-500 hover:bg-green-600">
                    Released
                </Badge>
            );

        case 'draft':
            return (
                <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    Draft
                </Badge>
            );

        case 'cancelled':
            return <Badge variant="destructive">Cancelled</Badge>;

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
}
