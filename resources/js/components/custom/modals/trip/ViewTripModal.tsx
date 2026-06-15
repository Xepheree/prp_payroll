import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Badge } from '@/components/ui/badge';

function ViewTripModal({
    open,
    setOpen,
    selectedTrip,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedTrip: any;
}) {
    if (!selectedTrip) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Trip Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Trip Date
                        </p>

                        <p className="font-medium">{selectedTrip.trip_date}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Truck</p>

                        <div className="flex items-center gap-2">
                            <img
                                src={`/storage/${selectedTrip.truck?.image}`}
                                alt={selectedTrip.truck?.alias}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                            <p className="font-medium">
                                {selectedTrip.truck?.plate} -{' '}
                                {selectedTrip.truck?.alias}
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Driver</p>

                        <p className="font-medium">
                            {selectedTrip.driver?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Helper</p>

                        <p className="font-medium">
                            {selectedTrip.helper?.name ?? 'No Helper'}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Trip Type
                        </p>

                        <Badge className="capitalize">
                            {selectedTrip.trip_type}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">Created</p>

                        <p className="font-medium">{selectedTrip.created_at}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ViewTripModal;
