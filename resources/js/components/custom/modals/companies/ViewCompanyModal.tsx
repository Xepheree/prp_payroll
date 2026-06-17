import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

function ViewCompanyModal({ open, onOpenChange, selectedCompany }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Company Details</DialogTitle>
                </DialogHeader>

                {selectedCompany && (
                    <div className="max-h-[70vh] space-y-4 overflow-y-auto">
                        <img
                            src={
                                selectedCompany.image
                                    ? `/storage/${selectedCompany.image}`
                                    : '/images/company_placeholder.jpg'
                            }
                            alt={selectedCompany.name}
                            className="h-56 w-full rounded-lg border object-cover"
                            onError={(e) => {
                                e.currentTarget.src =
                                    '/storage/companies/company_placeholder.png';
                            }}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Company Name
                                </p>
                                <p className="font-medium">
                                    {selectedCompany.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Specialization
                                </p>
                                <p className="font-medium">
                                    {selectedCompany.specialization || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Contact Person
                                </p>
                                <p className="font-medium">
                                    {selectedCompany.contact_person_name || '-'}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Contact Number
                                </p>
                                <p className="font-medium">
                                    {selectedCompany.contact_person_number ||
                                        '-'}
                                </p>
                            </div>

                            <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">
                                    Address
                                </p>
                                <p className="font-medium whitespace-pre-wrap">
                                    {selectedCompany.address || '-'}
                                </p>
                            </div>

                            <div className="col-span-2">
                                <p className="text-sm text-muted-foreground">
                                    Details
                                </p>
                                <p className="font-medium whitespace-pre-wrap">
                                    {selectedCompany.details || '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ViewCompanyModal;
