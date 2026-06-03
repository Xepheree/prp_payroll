import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

function CreateTruckModal({
    openCreate,
    setOpenCreate,
}: {
    openCreate: boolean;
    setOpenCreate: any;
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<{
        image: File | null;
        plate: string;
        alias: string;
        make: string;
        category: string;
        status: string;
    }>({
        image: null,
        plate: '',
        alias: '',
        make: '',
        category: '',
        status: 'ready',
    });

    const resetState = () => {
        setForm({
            image: null,
            plate: '',
            alias: '',
            make: '',
            category: '',
            status: 'ready',
        });

        setImagePreview('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = () => {
        const data = new FormData();

        data.append('plate', form.plate);
        data.append('alias', form.alias);
        data.append('make', form.make);
        data.append('category', form.category);
        data.append('status', form.status);

        if (form.image) {
            data.append('image', form.image);
        }

        router.post('/trucks', data, {
            forceFormData: true,

            onSuccess: () => {
                toast.success('Truck created successfully');

                resetState();
                setOpenCreate(false);
            },

            onError: (errors) => {
                const firstError = Object.values(errors)[0];

                if (firstError) {
                    toast.error(firstError as string);
                }
            },
        });
    };

    const [imagePreview, setImagePreview] = useState('');

    return (
        <>
            <Dialog
                open={openCreate}
                onOpenChange={(open) => {
                    setOpenCreate(open);

                    if (!open) {
                        resetState();
                    }
                }}
            >
                <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Add Truck</DialogTitle>
                    </DialogHeader>

                    <div className="grid max-h-[65vh] gap-4 overflow-y-auto py-4">
                        <div className="space-y-2">
                            <Label>Truck Image</Label>

                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (file) {
                                        setForm({
                                            ...form,
                                            image: file,
                                        });

                                        setImagePreview(
                                            URL.createObjectURL(file),
                                        );
                                    }
                                }}
                            />

                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Truck Preview"
                                    className="h-48 w-full rounded-lg border object-cover"
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Plate Number</Label>
                            <Input
                                value={form.plate}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        plate: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Alias</Label>
                            <Input
                                value={form.alias}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        alias: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Make</Label>

                            <Select
                                value={form.make}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        make: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Make" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="isuzu">Isuzu</SelectItem>
                                    <SelectItem value="stc">STC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                value={form.category}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        category: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="wingvan">
                                        Wingvan
                                    </SelectItem>

                                    <SelectItem value="dropside">
                                        Dropside
                                    </SelectItem>

                                    <SelectItem value="trailer">
                                        Trailer
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>

                            <Select
                                value={form.status}
                                onValueChange={(value) =>
                                    setForm({
                                        ...form,
                                        status: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="ready">Ready</SelectItem>

                                    <SelectItem value="for repair">
                                        For Repair
                                    </SelectItem>

                                    <SelectItem value="unavailable">
                                        Unavailable
                                    </SelectItem>

                                    <SelectItem value="on trip">
                                        On Trip
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setOpenCreate(false)}
                        >
                            Cancel
                        </Button>

                        <Button onClick={submit}>Save Truck</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            ;
        </>
    );
}

export default CreateTruckModal;
