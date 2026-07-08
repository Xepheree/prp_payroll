import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Pencil, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

import type { User } from '@/types';

import { Input } from '@/components/ui/input';
import DeleteConfirmationDialog from '@/components/custom/modals/DeleteConfirmationDialog';
import ViewAccountModal from '@/components/custom/modals/ViewAccountModal';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    users: User[];
};

export default function Index() {
    const { accounts } = usePage().props;
    const { delete: destroy, processing } = useForm();
    const { auth } = usePage<PageProps>().props;

    const isSuperAdmin = auth.user.role === 'superadmin';

    const handleDelete = (id: number) => {
        destroy(`/accounts/${id}`, {
            onSuccess: () => {
                toast.success('Account deleted!');
            },
            onError: () => {
                toast.error('Unable to delete account.');
            },
        });
    };

    // View employee modal

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [openView, setOpenView] = useState(false);

    const handleRowClick = (account: User) => {
        setSelectedAccount(account);
        setOpenView(true);
    };

    // searches

    const [search, setSearch] = useState('');

    const filteredAccounts = accounts.filter((account) => {
        const keyword = search.toLowerCase();

        return (
            account.name.toLowerCase().includes(keyword) ||
            account.email.toLowerCase().includes(keyword) ||
            account.role.toLowerCase().includes(keyword)
        );
    });

    return (
        <>
            <Head title="Accounts" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Accounts</h1>

                        <p className="text-muted-foreground">
                            Manage user accounts and permissions.
                        </p>
                    </div>

                    {isSuperAdmin && (
                        <Button asChild>
                            <Link href="/register">
                                <Plus className="mr-2 h-4 w-4" />
                                New Account
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="flex flex-wrap gap-3">
                    <div className="relative min-w-[250px] flex-1">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Search accounts..."
                            className="pl-9"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Accounts</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-14">
                                        Profile
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>

                                    {isSuperAdmin && (
                                        <TableHead className="w-28">
                                            Actions
                                        </TableHead>
                                    )}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredAccounts.map((account) => {
                                    return (
                                        <TableRow
                                            key={account.id}
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleRowClick(account)
                                            }
                                        >
                                            <TableCell>
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            account.profile_picture
                                                                ? `/storage/${account.profile_picture}`
                                                                : '/images/employee_placeholder.png'
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {account.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </TableCell>

                                            <TableCell className="font-medium">
                                                {account.name}
                                            </TableCell>

                                            <TableCell>
                                                <Badge
                                                    className="capitalize"
                                                    variant={
                                                        account.role ===
                                                        'superadmin'
                                                            ? 'destructive'
                                                            : account.role ===
                                                                'admin'
                                                              ? 'default'
                                                              : 'secondary'
                                                    }
                                                >
                                                    {account.role}
                                                </Badge>
                                            </TableCell>

                                            <TableCell>
                                                {account.email}
                                            </TableCell>

                                            {isSuperAdmin && (
                                                <TableCell
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                >
                                                    <div className="flex gap-1">
                                                        <Button
                                                            asChild
                                                            size="icon"
                                                            variant="outline"
                                                        >
                                                            <Link
                                                                href={`/accounts/${account.id}/edit`}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>

                                                        <DeleteConfirmationDialog
                                                            title="Delete Account?"
                                                            description={`This will permanently delete ${account.name}. This action cannot be undone.`}
                                                            processing={
                                                                processing
                                                            }
                                                            onConfirm={() =>
                                                                handleDelete(
                                                                    account.id,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <ViewAccountModal
                open={openView}
                setOpen={setOpenView}
                account={selectedAccount}
            />
        </>
    );
}
