import { router } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function CreateCompanyModal({ open, onOpenChange }) {
    const [form, setForm] = useState<{
        image: File | null;
        name: string;
        specialization: string;
        contact_person_name: string;
        contact_person_number: string;
        address: string;
        details: string;
    }>({
        image: null,
        name: '',
        specialization: '',
        contact_person_name: '',
        contact_person_number: '',
        address: '',
        details: '',
    });

    const [imagePreview, setImagePreview] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetState = () => {
        setForm({
            image: null,
            name: '',
            specialization: '',
            contact_person_name: '',
            contact_person_number: '',
            address: '',
            details: '',
        });

        setImagePreview('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = () => {
        const data = new FormData();

        data.append('name', form.name);
        data.append('specialization', form.specialization);
        data.append('contact_person_name', form.contact_person_name);
        data.append('contact_person_number', form.contact_person_number);
        data.append('address', form.address);
        data.append('details', form.details);

        if (form.image) {
            data.append('image', form.image);
        }

        router.post('/companies', data, {
            forceFormData: true,

            onSuccess: () => {
                toast.success('Company created successfully');

                resetState();
                onOpenChange(false);
            },

            onError: (errors) => {
                const firstError = Object.values(errors)[0];

                if (firstError) {
                    toast.error(firstError as string);
                }
            },
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                onOpenChange(value);

                if (!value) {
                    resetState();
                }
            }}
        >
            <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Add Company</DialogTitle>
                </DialogHeader>

                <div className="grid max-h-[65vh] gap-4 overflow-y-auto py-4">
                    <div className="space-y-2">
                        <Label>Company Logo</Label>

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

                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                        />

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Company Preview"
                                className="h-48 w-full rounded-lg border object-cover"
                            />
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Company Name</Label>

                        <Input
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Specialization</Label>

                        <Input
                            value={form.specialization}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    specialization: e.target.value,
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
                            rows={3}
                            value={form.address}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    address: e.target.value,
                                })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Details</Label>

                        <Textarea
                            rows={5}
                            value={form.details}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    details: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => {
                            resetState();
                            onOpenChange(false);
                        }}
                    >
                        Cancel
                    </Button>

                    <Button onClick={submit}>Save Company</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateCompanyModal;
