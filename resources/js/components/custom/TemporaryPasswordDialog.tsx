import { Check, Copy, KeyRound } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    employeeName: string;
    temporaryPassword: string;
};

export default function TemporaryPasswordDialog({
    open,
    setOpen,
    employeeName,
    temporaryPassword,
}: Props) {
    const [copied, setCopied] = useState(false);

    const copyPassword = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(temporaryPassword);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = temporaryPassword;

                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';

                document.body.appendChild(textarea);

                textarea.focus();
                textarea.select();

                document.execCommand('copy');

                document.body.removeChild(textarea);
            }

            setCopied(true);

            toast.success('Temporary password copied.');

            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error);
            toast.error('Unable to copy password.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5" />
                        Temporary Password Generated
                    </DialogTitle>

                    <DialogDescription>
                        A new temporary password has been generated for{' '}
                        <span className="font-semibold">{employeeName}</span>.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <p className="mb-2 text-sm font-medium">
                            Temporary Password
                        </p>

                        <div className="flex gap-2">
                            <Input
                                readOnly
                                value={temporaryPassword}
                                className="font-mono"
                            />

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    copyPassword();
                                }}
                            >
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-muted p-4 text-sm text-muted-foreground">
                        This password is shown only once. Share it securely with
                        the employee and advise them to change it immediately
                        after logging in.
                    </div>
                </div>

                <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
