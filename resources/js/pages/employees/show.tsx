import { Head, usePage } from '@inertiajs/react';
import { Avatar } from '@radix-ui/react-avatar';
import AssistedTripsTab from '@/components/custom/tabs/employee-show/AssistedTripsTab';
import DeductionTab from '@/components/custom/tabs/employee-show/DeductionTab';
import DrivenTripsTab from '@/components/custom/tabs/employee-show/DrivenTripsTab';
import PayrollHistoryTab from '@/components/custom/tabs/employee-show/PayrollHistoryTab';
import TransactionTab from '@/components/custom/tabs/employee-show/TransactionTab';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    getEmployeeDesignationBadge,
    getEmployeeStatusBadge,
} from '@/pages/employees';

export default function Show() {
    const { employee, filters } = usePage<{
        employee: Employee;
        filters: {
            start_date?: string;
            end_date?: string;
        };
    }>().props;
    console.log(employee);

    return (
        <>
            <Head title={employee.name} />

            <div className="space-y-6 p-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex gap-8">
                            <Avatar className="h-40 w-40 rounded-lg border">
                                <AvatarImage
                                    src={
                                        employee.image
                                            ? `/storage/${employee.image}`
                                            : '/images/employee_placeholder.png'
                                    }
                                />

                                <AvatarFallback>
                                    {employee.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h2 className="text-3xl font-bold">
                                    {employee.name}
                                </h2>

                                <p className="text-lg text-muted-foreground">
                                    {employee.designation}
                                </p>

                                <div className="mt-4 flex gap-2">
                                    {getEmployeeDesignationBadge(
                                        employee.designation,
                                    )}

                                    {getEmployeeStatusBadge(employee.status)}
                                </div>

                                {employee.description && (
                                    <>
                                        <Separator className="my-6" />

                                        <div>
                                            <h3 className="font-semibold">
                                                Description
                                            </h3>

                                            <p className="mt-2 text-muted-foreground">
                                                {employee.description}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Daily Rate
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.rate.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        OT Rate
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.ot_rate.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Trip Rate
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.trip_rate.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Current Balance
                                    </p>

                                    <p className="text-xl font-semibold">
                                        ₱{employee.balance.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Tabs defaultValue="transactions" className="w-full">
                    <TabsList>
                        <TabsTrigger value="transactions">
                            Transactions
                        </TabsTrigger>

                        <TabsTrigger value="driven">Driven Trips</TabsTrigger>

                        <TabsTrigger value="assisted">
                            Assisted Trips
                        </TabsTrigger>

                        <TabsTrigger value="payroll">
                            Payroll History
                        </TabsTrigger>

                        <TabsTrigger value="deductions">Deductions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="transactions">
                        <TransactionTab employee={employee} filters={filters} />
                    </TabsContent>

                    <TabsContent value="driven">
                        <DrivenTripsTab employee={employee} />
                    </TabsContent>

                    <TabsContent value="assisted">
                        <AssistedTripsTab employee={employee} />
                    </TabsContent>

                    <TabsContent value="payroll">
                        <PayrollHistoryTab employee={employee} />
                    </TabsContent>

                    <TabsContent value="deductions">
                        <DeductionTab employee={employee} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
