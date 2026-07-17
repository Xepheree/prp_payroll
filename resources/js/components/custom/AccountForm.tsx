import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import type { User } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import TemporaryPasswordDialog from './TemporaryPasswordDialog';

type Props = {
    passwordRules?: null | string;
    isEditing?: boolean;
    account?: User;
};

function AccountForm({
    passwordRules = null,
    isEditing = false,
    account,
}: Props) {
    const availableRoles = ['employee', 'admin', 'superadmin'];

    const form = useForm({
        name: account?.name ?? '',
        email: account?.email ?? '',
        role: account?.role ?? 'employee',
        profile_picture: null as File | null,
        password: '',
    });

    const generatePassword = () => {
        const chars =
            'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*';

        let password = '';

        for (let i = 0; i < 16; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        form.setData('password', password);
    };

    const submit = () => {
        if (isEditing) {
            form.put(`/accounts/${account.id}`, {
                forceFormData: true,
                onSuccess: () => toast.success('Account updated!'),
            });
        } else {
            form.post('/accounts', {
                forceFormData: true,
                onSuccess: () => toast.success('User created!'),
            });
        }
    };

    const [preview, setPreview] = useState(
        account?.profile_picture
            ? `/storage/${account.profile_picture}`
            : '/images/employee_placeholder.png',
    );

    const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

    const [temporaryPassword, setTemporaryPassword] = useState('');

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const generateTemporaryPassword = async (id: number) => {
        try {
            const { data } = await axios.post(
                `/accounts/${id}/temporary-password`,
            );

            setSelectedEmployee(account);
            setTemporaryPassword(data.temporary_password);

            setOpenPasswordDialog(true);

            toast.success('Temporary password generated.');
        } catch {
            toast.error('Unable to generate temporary password.');
        }
    };

    // temporary password

    const copyPassword = async () => {
        try {
            if (window.navigator.clipboard) {
                await window.navigator.clipboard.writeText(form.data.password);
            } else {
                const input = document.createElement('textarea');
                input.value = form.data.password;
                document.body.appendChild(input);
                input.select();
                document.execCommand('copy');
                document.body.removeChild(input);
            }

            toast.success('Password copied.');
        } catch {
            toast.error('Unable to copy password.');
        }
    };

    return (
        <>
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>
                        {isEditing ? 'Edit Account' : 'Account Information'}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            submit();
                        }}
                        className="space-y-6"
                    >
                        <>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="profile_picture">
                                        Profile Picture
                                    </Label>

                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];

                                            if (!file) return;

                                            form.setData(
                                                'profile_picture',
                                                file,
                                            );
                                            setPreview(
                                                URL.createObjectURL(file),
                                            );
                                        }}
                                    />

                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src={preview} />
                                        <AvatarFallback>
                                            {form.data.name
                                                ?.split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <InputError
                                        message={form.errors.profile_picture}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="name">Full Name</Label>

                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        required
                                        value={form.data.name}
                                        onChange={(e) =>
                                            form.setData('name', e.target.value)
                                        }
                                    />

                                    <InputError message={form.errors.name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>

                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        required
                                        value={form.data.email}
                                        onChange={(e) =>
                                            form.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                    />

                                    <InputError message={form.errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>

                                    <Select
                                        value={form.data.role}
                                        onValueChange={(value) =>
                                            form.setData('role', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {availableRoles.map((role) => (
                                                <SelectItem
                                                    key={role}
                                                    value={role}
                                                >
                                                    {role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        role.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <InputError message={form.errors.role} />
                                </div>
                            </div>
                            {isEditing ? (
                                <Card className="border-muted">
                                    <CardHeader>
                                        <CardTitle>Password</CardTitle>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            Send the user a password reset link
                                            or generate a temporary password.
                                        </p>

                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() =>
                                                    generateTemporaryPassword(
                                                        account.id,
                                                    )
                                                }
                                            >
                                                Generate Temporary Password
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label>Password</Label>

                                        <div className="flex gap-2">
                                            <PasswordInput
                                                value={form.data.password}
                                                readOnly
                                            />

                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={generatePassword}
                                                >
                                                    Generate
                                                </Button>

                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={copyPassword}
                                                >
                                                    Copy
                                                </Button>
                                            </div>
                                        </div>

                                        <InputError
                                            message={form.errors.password}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit('/accounts')}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing && <Spinner />}
                                    {isEditing
                                        ? 'Update Account'
                                        : 'Create Account'}
                                </Button>
                            </div>
                        </>
                    </form>
                </CardContent>
            </Card>

            <TemporaryPasswordDialog
                open={openPasswordDialog}
                setOpen={setOpenPasswordDialog}
                employeeName={selectedEmployee?.name ?? ''}
                temporaryPassword={temporaryPassword}
            />
        </>
    );
}

export default AccountForm;
