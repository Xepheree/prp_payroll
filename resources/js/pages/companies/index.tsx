import { Head, usePage } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import CreateCompanyModal from '@/components/custom/modals/companies/CreateCompanyModal';
import ViewCompanyModal from '@/components/custom/modals/companies/ViewCompanyModal';
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

                    <Button onClick={() => setOpenCreate(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Company
                    </Button>
                </div>

                <Card>
                    <CardContent>
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
                                        onClick={() => handleRowClick(company)}
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        company.image
                                                            ? `/storage/${company.image}`
                                                            : '/storage/companies/company_placeholder.png'
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

                                                <Button
                                                    size="icon"
                                                    variant="destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
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
