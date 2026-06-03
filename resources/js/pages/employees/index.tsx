import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus, Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import DeleteConfirmationDialog from '@/components/custom/modals/DeleteConfirmationDialog';
import CreateEmployeeModal from '@/components/custom/modals/employees/CreateEmployeeModal';
import ViewEmployeeModal from '@/components/custom/modals/employees/ViewEmployeeModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default function Index() {
    // dummy data
    // const employees = [
    //     {
    //         id: 1,
    //         image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    //         name: 'Juan Dela Cruz',
    //         designation: 'Driver',
    //         rate: 850,
    //         ot_rate: 120,
    //         status: 'active',
    //     },
    //     {
    //         id: 2,
    //         image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    //         name: 'Maria Santos',
    //         designation: 'Dispatcher',
    //         rate: 950,
    //         ot_rate: 140,
    //         status: 'active',
    //     },
    //     {
    //         id: 3,
    //         image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    //         name: 'Pedro Reyes',
    //         designation: 'Helper',
    //         rate: 650,
    //         ot_rate: 100,
    //         status: 'inactive',
    //     },
    // ];

    const { employees, flash } = usePage().props as PageProps;
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [open, setOpen] = useState(false);

    const handleRowClick = (employee) => {
        setSelectedEmployee(employee);
        setOpen(true);
    };

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        destroy(`/employees/${id}`, {
            onSuccess: () => {
                toast.success(`${name} was removed successfully.`);
            },

            onError: () => {
                toast.error(`Failed to remove ${name}.`);
            },
        });
    };

    const [openCreate, setOpenCreate] = useState(false);

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

                    <Button onClick={() => setOpenCreate(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Employee
                    </Button>
                </div>

                <Card>
                    {/* <CardHeader>
                        <CardTitle></CardTitle>
                    </CardHeader> */}

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Designation</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>OT Rate</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[150px]">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {[...employees]
                                    .sort((a, b) => b.id - a.id)
                                    .map((employee, index) => (
                                        <TableRow
                                            key={employee.id}
                                            className="cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRowClick(employee);
                                            }}
                                        >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            employee.image
                                                                ? `/storage/${employee.image}`
                                                                : '/storage/employees/employee_placeholder.png'
                                                        }
                                                        alt={employee.name}
                                                        className="h-10 w-10 rounded-md border object-cover"
                                                    />
                                                    <span>{employee.name}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {getEmployeeDesignationBadge(
                                                    employee.designation,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                ₱
                                                {employee.rate.toLocaleString()}
                                            </TableCell>

                                            <TableCell>
                                                ₱
                                                {employee.ot_rate.toLocaleString()}
                                            </TableCell>

                                            <TableCell>
                                                {getEmployeeStatusBadge(
                                                    employee.status,
                                                )}
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>

                                                    <DeleteConfirmationDialog
                                                        title="Delete Employee?"
                                                        description={`This will permanently remove ${employee.name}. This action cannot be undone.`}
                                                        processing={processing}
                                                        onConfirm={() =>
                                                            handleDelete(
                                                                employee.id,
                                                                employee.name,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
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
                setOpenCreate={setOpenCreate}
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

Index.layout = {
    breadcrumbs: [
        {
            title: 'Employees',
            href: '/employees',
        },
    ],
};
