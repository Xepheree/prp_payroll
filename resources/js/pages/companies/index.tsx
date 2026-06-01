import { Head } from '@inertiajs/react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

export default function Index() {
    // dummy data
    const companies = [
        {
            id: 1,
            company_img:
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
            company_name: 'ABC Logistics',
            company_specialization: 'Construction Materials',
            contact_person_name: 'Juan Dela Cruz',
            contact_person_number: '09171234567',
            company_address: 'Quezon City, Philippines',
        },
        {
            id: 2,
            company_img:
                'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
            company_name: 'Metro Haulers',
            company_specialization: 'Food Distribution',
            contact_person_name: 'Maria Santos',
            contact_person_number: '09181234567',
            company_address: 'Makati City, Philippines',
        },
        {
            id: 3,
            company_img:
                'https://images.unsplash.com/photo-1460317442991-0ec209397118',
            company_name: 'Prime Movers Inc.',
            company_specialization: 'Heavy Equipment',
            contact_person_name: 'Pedro Reyes',
            contact_person_number: '09191234567',
            company_address: 'Subic Bay, Philippines',
        },
    ];

    const [selectedCompany, setSelectedCompany] = useState(null);
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [form, setForm] = useState({
        company_img: '',
        company_name: '',
        company_specialization: '',
        contact_person_name: '',
        contact_person_number: '',
        company_address: '',
    });

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
                    <CardHeader>
                        <CardTitle>Companies List</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Logo</TableHead>
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
                                                    src={company.company_img}
                                                    alt={company.company_name}
                                                    className="h-10 w-10 rounded-md border object-cover"
                                                />
                                                <span>
                                                    {company.company_name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {company.company_name}
                                        </TableCell>

                                        <TableCell>
                                            {company.company_specialization}
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Company Details</DialogTitle>
                    </DialogHeader>

                    {selectedCompany && (
                        <div className="space-y-4">
                            <img
                                src={selectedCompany.company_img}
                                alt={selectedCompany.company_name}
                                className="h-48 w-full rounded-lg border object-cover"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Company Name
                                    </p>
                                    <p className="font-medium">
                                        {selectedCompany.company_name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Specialization
                                    </p>
                                    <p className="font-medium">
                                        {selectedCompany.company_specialization}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Contact Person
                                    </p>
                                    <p className="font-medium">
                                        {selectedCompany.contact_person_name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Contact Number
                                    </p>
                                    <p className="font-medium">
                                        {selectedCompany.contact_person_number}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">
                                        Address
                                    </p>
                                    <p className="font-medium">
                                        {selectedCompany.company_address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add Company</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label>Company Image URL</Label>
                            {/* <Input
                                placeholder="https://..."
                                value={form.company_img}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_img: e.target.value,
                                    })
                                }
                            /> */}
                            <Input type="file" accept="image/*" />
                        </div>

                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                value={form.company_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Specialization</Label>
                            <Input
                                value={form.company_specialization}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_specialization: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Contact Person</Label>
                            <Input
                                value={form.contact_person_name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        contact_person_name: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Contact Number</Label>
                            <Input
                                value={form.contact_person_number}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        contact_person_number: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Company Address</Label>
                            <Textarea
                                value={form.company_address}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        company_address: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenCreate(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={() => {
                                console.log(form);

                                setOpenCreate(false);
                            }}
                        >
                            Save Company
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
