import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    account: any;
};

export default function ViewAccountModal({ open, setOpen, account }: Props) {
    if (!account) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Account Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-8">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-32 w-32 rounded-xl">
                            <AvatarImage
                                src={
                                    account.profile_picture
                                        ? `/storage/${account.profile_picture}`
                                        : '/images/employee_placeholder.png'
                                }
                                alt={account.name}
                            />

                            <AvatarFallback className="text-3xl">
                                {account.name
                                    .split(' ')
                                    .map((n: string) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">
                                {account.name}
                            </h1>

                            <p className="text-muted-foreground">
                                {account.email}
                            </p>

                            <Badge
                                variant={
                                    account.role === 'superadmin'
                                        ? 'destructive'
                                        : account.role === 'admin'
                                          ? 'default'
                                          : 'secondary'
                                }
                                className="capitalize"
                            >
                                {account.role}
                            </Badge>
                        </div>
                    </div>

                    <div>
                        <h2 className="mb-4 border-b pb-2 text-lg font-semibold">
                            Account Information
                        </h2>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Name
                                </p>

                                <p>{account.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Email
                                </p>

                                <p>{account.email}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Role
                                </p>

                                <p className="capitalize">{account.role}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    User ID
                                </p>

                                <p>{account.id}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Created At
                                </p>

                                <p>
                                    {new Date(
                                        account.created_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Last Updated
                                </p>

                                <p>
                                    {new Date(
                                        account.updated_at,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
