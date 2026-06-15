import { Head, usePage } from '@inertiajs/react';
import { Building2, CreditCard, Truck, Users, Plus } from 'lucide-react';

import { dashboard } from '@/routes';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
    const { employeeCount, truckCount, companyCount, totalBalance } = usePage()
        .props as PageProps;

    const stats = [
        {
            title: 'Employees',
            value: employeeCount,
            icon: Users,
        },
        {
            title: 'Trucks',
            value: truckCount,
            icon: Truck,
        },
        {
            title: 'Companies',
            value: companyCount,
            icon: Building2,
        },
        {
            title: 'Outstanding Balance',
            value: `₱${Number(totalBalance ?? 0).toLocaleString()}`,
            icon: CreditCard,
            danger: true,
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <Card key={stat.title}>
                                <CardContent className="flex items-center justify-between p-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            {stat.title}
                                        </p>

                                        <p
                                            className={`mt-2 text-3xl font-bold ${
                                                stat.danger
                                                    ? 'text-red-600'
                                                    : ''
                                            }`}
                                        >
                                            {stat.value}
                                        </p>
                                    </div>

                                    <div className="rounded-xl border p-3">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium">
                                        Employee records
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        View recently added employees and
                                        updates.
                                    </p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">
                                        Truck operations
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Monitor fleet availability and
                                        assignments.
                                    </p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">
                                        Payroll processing
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        Review outstanding balances and payroll
                                        status.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <div className="flex flex-col gap-2">
                                    <span>Quick Actions </span>
                                    <span className="text-sm font-normal text-muted-foreground italic">
                                        (Under Development)
                                    </span>
                                </div>
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Employee
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Truck
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Trip
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Run Payroll
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
