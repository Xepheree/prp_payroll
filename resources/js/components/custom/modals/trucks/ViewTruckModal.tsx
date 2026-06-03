import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { getStatusBadge } from '@/pages/trucks';

function ViewTruckModal({ open, setOpen, selectedTruck }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Truck Details</DialogTitle>
                </DialogHeader>

                {selectedTruck && (
                    <div className="space-y-4">
                        <img
                            src={
                                selectedTruck.image
                                    ? `/storage/${selectedTruck.image}`
                                    : '/storage/trucks/truck_placeholder.png'
                            }
                            alt={selectedTruck.alias}
                            className="h-48 w-full rounded-lg border object-cover"
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Plate Number
                                </p>
                                <p className="font-medium">
                                    {selectedTruck.plate}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Alias
                                </p>
                                <p className="font-medium">
                                    {selectedTruck.alias}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Status
                                </p>
                                {getStatusBadge(selectedTruck.status)}
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Type
                                </p>
                                <p className="font-medium">
                                    {selectedTruck.category}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ViewTruckModal;
