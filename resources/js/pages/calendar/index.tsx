import { router, useForm, usePage } from '@inertiajs/react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [creatingEvent, setCreatingEvent] = useState(false);

    const { events } = usePage().props as any;

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const days = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate));
        const end = endOfWeek(endOfMonth(currentDate));

        return eachDayOfInterval({
            start,
            end,
        });
    }, [currentDate]);

    const { data, setData, post } = useForm({
        date: '',
        title: '',
        description: '',
        color: 'blue',
    });

    const colors = [
        { label: 'Blue', value: 'blue' },
        { label: 'Yellow', value: 'yellow' },
        { label: 'Red', value: 'red' },
    ];

    const colorClasses = {
        blue: 'bg-blue-500 text-white',
        yellow: 'bg-yellow-400 text-black',
        red: 'bg-red-500 text-white',
    };

    const selectedEvents =
        selectedDate === null
            ? []
            : events.filter(
                  (event: any) =>
                      event.date === format(selectedDate, 'yyyy-MM-dd'),
              );

    const [editingEvent, setEditingEvent] = useState<any | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<any | null>(null);

    const saveEvent = () => {
        if (editingEvent) {
            router.put(`/calendar/${editingEvent.id}`, data, {
                onSuccess: () => {
                    toast.success('Event updated successfully.');
                    setCreatingEvent(false);
                    setEditingEvent(null);
                },
            });
        } else {
            post('/calendar', {
                onSuccess: () => {
                    toast.success('Event created successfully.');
                    setCreatingEvent(false);
                },
            });
        }
    };

    return (
        <>
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentDate(subMonths(currentDate, 1))
                        }
                        className="rounded border p-2"
                    >
                        <ChevronLeft size={18} />
                    </Button>

                    <h1 className="text-2xl font-bold">
                        {format(currentDate, 'MMMM yyyy')}
                    </h1>

                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentDate(addMonths(currentDate, 1))
                        }
                        className="rounded border p-2"
                    >
                        <ChevronRight size={18} />
                    </Button>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center font-semibold">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                        (day) => (
                            <div key={day}>{day}</div>
                        ),
                    )}
                </div>

                <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => {
                        const dayEvents = events.filter(
                            (event: any) =>
                                event.date === format(day, 'yyyy-MM-dd'),
                        );

                        return (
                            <div
                                onClick={() => {
                                    setSelectedDate(day);
                                    setCreatingEvent(false);

                                    setData({
                                        date: format(day, 'yyyy-MM-dd'),
                                        title: '',
                                        description: '',
                                        color: 'blue',
                                    });
                                }}
                                key={day.toISOString()}
                                className={`min-h-[120px] rounded-lg border p-2 transition ${
                                    isSameMonth(day, currentDate)
                                        ? 'cursor-pointer bg-accent text-accent-foreground hover:bg-accent/80'
                                        : 'bg-muted/20 text-muted-foreground'
                                } ${
                                    isSameDay(day, new Date())
                                        ? 'border-2 border-red-500/70 bg-red-500/10'
                                        : ''
                                } `}
                            >
                                <div className="mb-2 font-semibold">
                                    {format(day, 'd')}
                                </div>

                                <div className="mt-2 space-y-1">
                                    {dayEvents.map((event: any) => (
                                        <div
                                            key={event.id}
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                colorClasses[
                                                    event.color as keyof typeof colorClasses
                                                ] ?? 'bg-gray-500 text-white'
                                            }`}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <Dialog
                open={selectedDate !== null}
                onOpenChange={() => setSelectedDate(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {selectedDate &&
                                format(selectedDate, 'MMMM d, yyyy')}
                        </DialogTitle>
                    </DialogHeader>

                    {!creatingEvent ? (
                        <>
                            <>
                                {selectedEvents.length === 0 ? (
                                    <div className="py-10 text-center">
                                        <p className="text-muted-foreground">
                                            No events.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {selectedEvents.map((event: any) => (
                                            <div
                                                key={event.id}
                                                className={`flex flex-col rounded-lg px-2 py-2 ${
                                                    colorClasses[
                                                        event.color as keyof typeof colorClasses
                                                    ] ??
                                                    'bg-gray-500 text-white'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="pl-3">
                                                        {event.title}
                                                    </div>
                                                    <div className="space-x-1">
                                                        <Button
                                                            size="xs"
                                                            className="bg-blue-300 text-background hover:bg-blue-400"
                                                            onClick={() => {
                                                                setEditingEvent(
                                                                    event,
                                                                );
                                                                setCreatingEvent(
                                                                    true,
                                                                );

                                                                setData({
                                                                    date: event.date,
                                                                    title: event.title,
                                                                    description:
                                                                        event.description ??
                                                                        '',
                                                                    color: event.color,
                                                                });
                                                            }}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="xs"
                                                            className="bg-red-300 text-background hover:bg-red-400"
                                                            onClick={() => {
                                                                setEventToDelete(
                                                                    event,
                                                                );
                                                                setOpenDelete(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                {event.description && (
                                                    <div className="pl-3 text-xs text-muted">
                                                        {event.description}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Button
                                    className="mt-4 w-full"
                                    onClick={() => {
                                        setEditingEvent(null);
                                        setCreatingEvent(true);

                                        setData({
                                            date: format(
                                                selectedDate!,
                                                'yyyy-MM-dd',
                                            ),
                                            title: '',
                                            description: '',
                                            color: 'blue',
                                        });
                                    }}
                                >
                                    Add Event
                                </Button>
                            </>
                        </>
                    ) : (
                        <>
                            <Input
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                placeholder="Event title"
                            />

                            <Select
                                value={data.color}
                                onValueChange={(value) =>
                                    setData('color', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {colors.map((color) => (
                                            <SelectItem
                                                key={color.value}
                                                value={color.value}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`h-3 w-3 rounded-full bg-${color.value}-500`}
                                                    />
                                                    {color.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Description"
                            />

                            <Button onClick={saveEvent}>
                                {editingEvent ? 'Update' : 'Save'}
                            </Button>
                        </>
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Event?</AlertDialogTitle>

                        <AlertDialogDescription>
                            This action cannot be undone. The event "
                            {eventToDelete?.title}" will be permanently deleted.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>

                        <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => {
                                if (!eventToDelete) return;

                                router.delete(`/calendar/${eventToDelete.id}`, {
                                    preserveScroll: true,

                                    onSuccess: () => {
                                        toast.success(
                                            'Event deleted successfully.',
                                        );

                                        setOpenDelete(false);
                                        setEventToDelete(null);
                                    },

                                    onError: () => {
                                        toast.error('Unable to delete event.');
                                    },
                                });
                            }}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
