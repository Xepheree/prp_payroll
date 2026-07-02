import React, { useState } from 'react';
import { TableCell, TableRow } from '../ui/table';
import {
    getEmployeeDesignationBadge,
    getEmployeeStatusBadge,
} from '@/pages/employees';
import { Button } from '../ui/button';
import { ClipboardList, Pencil } from 'lucide-react';
import DeleteConfirmationDialog from './modals/DeleteConfirmationDialog';
import { toast } from 'sonner';
import { router, useForm } from '@inertiajs/react';

function EmployeeRow({
    employee,
    index,
    handleRowClick,
    setEditingEmployee,
    setOpenCreate,
}) {
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

    return (
        <TableRow
            key={employee.id}
            className="cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                handleRowClick(employee);
            }}
        >
            {/* Numbered 1 - N */}
            <TableCell>{index + 1}</TableCell>

            {/* Employee Photo */}
            <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                    <img
                        src={
                            employee.image
                                ? `/storage/${employee.image}`
                                : '/images/employee_placeholder.png'
                        }
                        alt={employee.name}
                        className="h-10 w-10 rounded-md border object-cover"
                    />
                    <span>{employee.name}</span>
                </div>
            </TableCell>

            {/* Employee Designation */}
            <TableCell>
                {getEmployeeDesignationBadge(employee.designation)}
            </TableCell>

            {/* Employee Rate */}
            <TableCell>₱{employee.rate.toLocaleString()}</TableCell>

            {/* Employee OT Rate */}
            <TableCell>₱{employee.ot_rate.toLocaleString()}</TableCell>

            {/* Employee Trip Rate */}
            <TableCell>₱{employee.trip_rate.toLocaleString()}</TableCell>

            {/* Employee Status */}
            <TableCell>{getEmployeeStatusBadge(employee.status)}</TableCell>

            {/* Employee Actions */}
            <TableCell>
                <div className="flex gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.visit(`/employees/${employee.id}`);
                        }}
                    >
                        <ClipboardList className="h-4 w-4" />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={(e) => {
                            e.stopPropagation();

                            setEditingEmployee(employee);
                            setOpenCreate(true);
                        }}
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>

                    <DeleteConfirmationDialog
                        title="Delete Employee?"
                        description={`This will permanently remove ${employee.name}. This action cannot be undone.`}
                        processing={processing}
                        onConfirm={() =>
                            handleDelete(employee.id, employee.name)
                        }
                    />
                </div>
            </TableCell>
        </TableRow>
    );
}

export default EmployeeRow;
