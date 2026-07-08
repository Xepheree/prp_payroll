import { Head, usePage } from '@inertiajs/react';
import AccountForm from '@/components/custom/AccountForm';
import type { User } from '@/types';

export default function Register() {
    const { account } = usePage().props as {
        account: User;
    };

    return (
        <>
            <Head title="New Account" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Account</h1>

                        <p className="text-muted-foreground">
                            Modify user account.
                        </p>
                    </div>
                </div>
                <AccountForm account={account} isEditing />
            </div>
        </>
    );
}
