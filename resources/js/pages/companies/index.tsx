import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus, Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import EmptyState from '@/components/custom/EmptyState';
import CreateCompanyModal from '@/components/custom/modals/companies/CreateCompanyModal';
import ViewCompanyModal from '@/components/custom/modals/companies/ViewCompanyModal';
import DeleteConfirmationDialog from '@/components/custom/modals/DeleteConfirmationDialog';

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
    const { companies, flash } = usePage().props as PageProps;

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const handleRowClick = (company) => {
        setSelectedCompany(company);
        setOpen(true);
    };

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        destroy(`/companies/${id}`, {
            onSuccess: () => {
                toast.success(`${name} was removed successfully.`);
            },

            onError: () => {
                toast.error(`Failed to remove ${name}.`);
            },
        });
    };

    return (
        <>
            <Head title="Company" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Companies</h1>
                        <p className="text-muted-foreground">
                            Manage partnership with companies.
                        </p>
                    </div>
                    {companies.length !== 0 && (
                        <Button onClick={() => setOpenCreate(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Company
                        </Button>
                    )}
                </div>

                <Card>
                    <CardContent>
                        {companies.length === 0 ? (
                            <EmptyState
                                title="No Companies Found"
                                description="Start by adding your first company."
                                actionLabel="Add Company"
                                onAction={() => setOpenCreate(true)}
                            />
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Specialization</TableHead>
                                        <TableHead>Contact Person</TableHead>
                                        <TableHead>Contact Number</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {companies.map((company) => (
                                        <TableRow
                                            key={company.id}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleRowClick(company)
                                            }
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={
                                                            company.image
                                                                ? `/storage/${company.image}`
                                                                : '/images/company_placeholder.jpg'
                                                        }
                                                        alt={company.name}
                                                        className="h-10 w-10 rounded-md border object-cover"
                                                    />

                                                    <span>{company.name}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                {company.specialization}
                                            </TableCell>

                                            <TableCell>
                                                {company.contact_person_name}
                                            </TableCell>

                                            <TableCell>
                                                {company.contact_person_number}
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
                                                        description={`This will permanently remove ${company.name}. This action cannot be undone.`}
                                                        processing={processing}
                                                        onConfirm={() =>
                                                            handleDelete(
                                                                company.id,
                                                                company.name,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <ViewCompanyModal
                open={open}
                onOpenChange={setOpen}
                selectedCompany={selectedCompany}
            />

            <CreateCompanyModal
                open={openCreate}
                onOpenChange={setOpenCreate}
            />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Companies',
            href: '/companies',
        },
    ],
};
