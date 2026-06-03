import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    getEmployeeDesignationBadge,
    getEmployeeStatusBadge,
} from '@/pages/employees';

function ViewEmployeeModal({ open, setOpen, selectedEmployee }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl">
                <DialogTitle>Employee Details</DialogTitle>
                {selectedEmployee && (
                    <div className="space-y-6">
                        <div className="flex gap-6">
                            <img
                                src={
                                    selectedEmployee.image
                                        ? `/storage/${selectedEmployee.image}`
                                        : '/storage/employees/employee_placeholder.png'
                                }
                                alt={selectedEmployee.name}
                                className="h-40 w-40 rounded-lg border object-cover"
                            />

                            <div className="flex-1">
                                <h1 className="text-3xl font-bold">
                                    {selectedEmployee.name}
                                </h1>

                                <p className="text-lg text-muted-foreground">
                                    {selectedEmployee.designation}
                                </p>

                                <div className="mt-4 space-y-2">
                                    <div className="flex w-full justify-between gap-2">
                                        <span className="font-semibold">
                                            Daily Rate:
                                        </span>

                                        <span>
                                            ₱{' '}
                                            {selectedEmployee.rate.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex w-full justify-between gap-2">
                                        <span className="font-semibold">
                                            OT Rate:
                                        </span>
                                        <span>
                                            ₱
                                            {selectedEmployee.ot_rate.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-2 border-b pb-2 text-lg font-semibold">
                                Employment Details
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Designation
                                    </p>

                                    <p>
                                        {getEmployeeDesignationBadge(
                                            selectedEmployee.designation,
                                        )}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Status
                                    </p>
                                    <p>
                                        {getEmployeeStatusBadge(
                                            selectedEmployee.status,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <h2 className="mb-2 border-b pb-2 text-lg font-semibold">
                                Payroll Information
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Daily Rate
                                    </p>
                                    <p>₱{selectedEmployee.rate}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        OT Rate
                                    </p>
                                    <p>₱{selectedEmployee.ot_rate}</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ViewEmployeeModal;
