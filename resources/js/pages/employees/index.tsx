import { Head, usePage } from '@inertiajs/react';
import { FileText, Plus } from 'lucide-react';
import { useState } from 'react';
import EmployeeRow from '@/components/custom/EmployeeRow';
import EmptyState from '@/components/custom/EmptyState';
import CreateEmployeeModal from '@/components/custom/modals/employees/CreateEmployeeModal';
import ViewEmployeeModal from '@/components/custom/modals/employees/ViewEmployeeModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { exportEmployeeMasterlist } from '@/lib/pdf/employee-masterlist';

export default function Index() {
    const { employees } = usePage().props as any;
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [open, setOpen] = useState(false);

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const [openCreate, setOpenCreate] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    return (
        <>
            <Head title="Employees" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Employee Masterlist
                        </h1>
                        <p className="text-muted-foreground">
                            Manage Employees.
                        </p>
                    </div>
                    {employees.length !== 0 && (
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() =>
                                    exportEmployeeMasterlist(employees)
                                }
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Export PDF
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditingEmployee(null);
                                    setOpenCreate(true);
                                }}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Employee
                            </Button>
                        </div>
                    )}
                </div>

                <Card>
                    {/* <CardHeader>
                        <CardTitle></CardTitle>
                    </CardHeader> */}

                    <CardContent>
                        {employees.length === 0 ? (
                            <EmptyState
                                title="No Employees Registered"
                                description="Register employees to get started."
                                actionLabel="Add Employee"
                                onAction={() => setOpenCreate(true)}
                            />
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Designation</TableHead>
                                        <TableHead>Rate</TableHead>
                                        <TableHead>OT Rate</TableHead>
                                        <TableHead>Trip Rate</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[150px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {[...employees].map((employee, index) => (
                                        <EmployeeRow
                                            employee={employee}
                                            index={index}
                                            handleRowClick={handleRowClick}
                                            setEditingEmployee={
                                                setEditingEmployee
                                            }
                                            setOpenCreate={setOpenCreate}
                                            key={employee.id}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <ViewEmployeeModal
                open={open}
                setOpen={setOpen}
                selectedEmployee={selectedEmployee}
            />

            <CreateEmployeeModal
                openCreate={openCreate}
                setOpenCreate={(open) => {
                    setOpenCreate(open);

                    if (!open) {
                        setEditingEmployee(null);
                    }
                }}
                employee={editingEmployee}
            />
        </>
    );
}

export const getEmployeeStatusBadge = (status) => {
    switch (status) {
        case 'active':
            return (
                <Badge className="bg-green-500 hover:bg-green-600">
                    Active
                </Badge>
            );

        case 'inactive':
            return <Badge variant="destructive">Inactive</Badge>;

        default:
            return <Badge variant="secondary">{status}</Badge>;
    }
};

const designationColors = {
    driver: 'bg-blue-500 hover:bg-blue-600',
    helper: 'bg-green-500 hover:bg-green-600',
    cutter: 'bg-red-500 hover:bg-red-600',
    checker: 'bg-purple-500 hover:bg-purple-600',
    dispatcher: 'bg-orange-500 hover:bg-orange-600',
    sorter: 'bg-cyan-500 hover:bg-cyan-600',
    presser: 'bg-pink-500 hover:bg-pink-600',
    guard: 'bg-slate-600 hover:bg-slate-700',
    hr: 'bg-emerald-500 hover:bg-emerald-600',
    finance: 'bg-yellow-500 hover:bg-yellow-600',
};

export const getEmployeeDesignationBadge = (designation) => (
    <Badge
        className={
            designationColors[designation?.toLowerCase()] || 'bg-secondary'
        }
    >
        {designation}
    </Badge>
);
