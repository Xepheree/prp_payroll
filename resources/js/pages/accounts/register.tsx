import AccountForm from '@/components/custom/AccountForm';
import { Head } from '@inertiajs/react';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="New Account" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">New Account</h1>

                        <p className="text-muted-foreground">
                            Create a new user account.
                        </p>
                    </div>
                </div>

                <AccountForm passwordRules={passwordRules} />
            </div>
        </>
    );
}
