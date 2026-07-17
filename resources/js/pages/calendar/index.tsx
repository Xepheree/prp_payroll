import { router, useForm, usePage } from '@inertiajs/react';
import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
<<<<<<< HEAD
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    subMonths,
=======
    getDate,
    getDay,
    getMonth,
    isAfter,
    isSameDay,
    isSameMonth,
    parseISO,
    startOfMonth,
    startOfWeek,
    subMonths,
    differenceInCalendarDays,
    differenceInCalendarWeeks,
    differenceInCalendarMonths,
    getWeekOfMonth,
    lastDayOfMonth,
>>>>>>> ad5c97e (Add the completed Calendar module)
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';
<<<<<<< HEAD
=======
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
>>>>>>> ad5c97e (Add the completed Calendar module)

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

    const today = format(new Date(), 'yyyy-MM-dd');

    const { data, setData } = useForm({
        title: '',
        description: '',

        start_date: today,
        end_date: today,

        all_day: true,

        visibility: 'public',

        permissions: [] as {
            permission_type: 'role' | 'user';
            permission_value: string;
        }[],

        type: 'event',

        color: '#3b82f6',

        recurrence_type: 'none',

        repeat_interval: 1,

        monthly_repeat_mode: 'day_of_month',

        week_of_month: 1,

        day_of_week: 0,
    });

    const eventTypes = [
        { label: 'Event', value: 'event' },
        { label: 'Holiday', value: 'holiday' },
        { label: 'Leave', value: 'leave' },
        { label: 'Birthday', value: 'birthday' },
        { label: 'Announcement', value: 'announcement' },
    ];

    const visibilityOptions = [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
        { label: 'Custom', value: 'custom' },
    ];

    const recurrenceOptions = [
        { label: 'Does not repeat', value: 'none' },
        { label: 'Every day', value: 'daily' },
        { label: 'Every week', value: 'weekly' },
        { label: 'Every month', value: 'monthly' },
        { label: 'Every year', value: 'yearly' },
    ];

    const weekOptions = [
        { label: 'First', value: 1 },
        { label: 'Second', value: 2 },
        { label: 'Third', value: 3 },
        { label: 'Fourth', value: 4 },
        { label: 'Last', value: 5 },
    ];

    const weekdayOptions = [
        { label: 'Sunday', value: 0 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 },
    ];

    const colors = [
        { label: 'Blue', value: '#3b82f6' },
        { label: 'Green', value: '#22c55e' },
        { label: 'Yellow', value: '#eab308' },
        { label: 'Orange', value: '#f97316' },
        { label: 'Red', value: '#ef4444' },
        { label: 'Purple', value: '#8b5cf6' },
        { label: 'Pink', value: '#ec4899' },
        { label: 'Gray', value: '#6b7280' },
    ];

    const [editingEvent, setEditingEvent] = useState<any | null>(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<any | null>(null);

    const saveEvent = () => {
        const payload = {
            ...data,
            end_date: data.end_date || data.start_date,
        };

        if (editingEvent) {
            router.put(`/calendar/${editingEvent.id}`, payload, {
                preserveScroll: true,

                onSuccess: () => {
                    toast.success('Event updated successfully.');
                    setCreatingEvent(false);
                    setEditingEvent(null);
                },
            });
        } else {
            router.post('/calendar', payload, {
                preserveScroll: true,

                onSuccess: () => {
                    toast.success('Event created successfully.');
                    setCreatingEvent(false);
                },
            });
        }
    };

<<<<<<< HEAD
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

=======
    const isLastWeekOfMonth = (date: Date) => {
        return getWeekOfMonth(date) === getWeekOfMonth(lastDayOfMonth(date));
    };

    const occursOnDay = (event: any, day: Date) => {
        const start = parseISO(event.start_date);
        const end = parseISO(event.end_date ?? event.start_date);

        switch (event.recurrence_type) {
            case 'none':
                return (
                    format(day, 'yyyy-MM-dd') >= format(start, 'yyyy-MM-dd') &&
                    format(day, 'yyyy-MM-dd') <= format(end, 'yyyy-MM-dd')
                );

            case 'daily': {
                if (isAfter(start, day)) return false;

                return (
                    differenceInCalendarDays(day, start) %
                        event.repeat_interval ===
                    0
                );
            }

            case 'weekly': {
                if (isAfter(start, day)) return false;

                return (
                    getDay(day) === getDay(start) &&
                    differenceInCalendarWeeks(day, start) %
                        event.repeat_interval ===
                        0
                );
            }

            case 'monthly': {
                if (isAfter(start, day)) return false;

                if (
                    differenceInCalendarMonths(day, start) %
                        event.repeat_interval !==
                    0
                ) {
                    return false;
                }

                if (event.monthly_repeat_mode === 'day_of_month') {
                    return getDate(day) === getDate(start);
                }

                if (event.monthly_repeat_mode === 'weekday_of_month') {
                    if (getDay(day) !== event.day_of_week) {
                        return false;
                    }

                    const matchingDays = [];

                    const current = new Date(
                        day.getFullYear(),
                        day.getMonth(),
                        1,
                    );

                    while (current.getMonth() === day.getMonth()) {
                        if (getDay(current) === event.day_of_week) {
                            matchingDays.push(new Date(current));
                        }

                        current.setDate(current.getDate() + 1);
                    }

                    if (event.week_of_month === 5) {
                        return isSameDay(
                            day,
                            matchingDays[matchingDays.length - 1],
                        );
                    }

                    return isSameDay(
                        day,
                        matchingDays[event.week_of_month - 1],
                    );
                }

                return false;
            }

            case 'yearly':
                return (
                    getMonth(day) === getMonth(start) &&
                    getDate(day) === getDate(start)
                );

            default:
                return false;
        }
    };

    const selectedEvents =
        selectedDate === null
            ? []
            : events.filter((event: any) => occursOnDay(event, selectedDate));

    // Event Formatter
    const eventIcons = {
        event: '🎉',
        holiday: '🏖',
        birthday: '🎂',
        announcement: '📢',
        leave: '🌴',
    };

    const formatEventDate = (event: any) => {
        const start = format(new Date(event.start_date), 'MMM d');
        const end = format(
            new Date(event.end_date ?? event.start_date),
            'MMM d',
        );

        return start === end ? start : `${start} – ${end}`;
    };

    const availableRoles = [
        { label: 'Super Admin', value: 'superadmin' },
        { label: 'Admin', value: 'admin' },
        // { label: 'HR', value: 'hr' },
        // { label: 'Finance', value: 'finance' },
        { label: 'Employee', value: 'employee' },
    ];

>>>>>>> ad5c97e (Add the completed Calendar module)
    return (
        <>
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    {/* left */}
                    <div className="flex flex-1 items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() =>
                                setCurrentDate(subMonths(currentDate, 1))
                            }
                            className="rounded border p-2"
                        >
                            <ChevronLeft size={18} />
                        </Button>
                        <Button onClick={() => setCurrentDate(new Date())}>
                            Move to Today
                        </Button>
                    </div>

                    {/* middle */}
                    <div className="flex flex-1 items-center justify-center">
                        <h1 className="text-4xl font-bold underline underline-offset-8">
                            {format(currentDate, 'MMMM yyyy')}
                        </h1>
                    </div>

                    {/* right */}
                    <div className="flex flex-1 items-center justify-end">
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
                        const dayEvents = events.filter((event: any) =>
                            occursOnDay(event, day),
                        );

                        return (
                            <div
                                onClick={() => {
                                    setSelectedDate(day);
                                    setCreatingEvent(false);

                                    setData({
                                        title: '',
                                        description: '',
<<<<<<< HEAD
                                        color: 'blue',
=======

                                        start_date: format(day, 'yyyy-MM-dd'),
                                        end_date: format(day, 'yyyy-MM-dd'),

                                        all_day: true,

                                        visibility: 'public',

                                        permissions: [],

                                        type: 'event',

                                        color: '#3b82f6',

                                        recurrence_type: 'none',

                                        repeat_interval: 1,

                                        monthly_repeat_mode: 'day_of_month',

                                        week_of_month: 1,

                                        day_of_week: 0,
>>>>>>> ad5c97e (Add the completed Calendar module)
                                    });
                                }}
                                key={day.toISOString()}
                                className={`min-h-[120px] rounded-lg border p-2 transition ${
                                    isSameMonth(day, currentDate)
                                        ? 'cursor-pointer bg-accent text-accent-foreground hover:bg-accent/80'
                                        : 'bg-muted/20 text-muted-foreground'
                                } ${
                                    isSameDay(day, new Date())
                                        ? 'border-3 border-foreground/70 bg-foreground/10'
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
                                            className="truncate rounded-md px-2 py-1 text-[11px] font-medium text-white shadow-sm"
                                            style={{
                                                backgroundColor: event.color,
                                            }}
                                        >
                                            <span className="mr-1">
                                                {eventIcons[event.type]}
                                            </span>

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
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedDate(null);
                        setCreatingEvent(false);
                        setEditingEvent(null);
                    }
                }}
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
<<<<<<< HEAD
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
=======
                                    <div className="space-y-3">
                                        {selectedEvents.map((event: any) => (
                                            <div
                                                key={event.id}
                                                className="rounded-xl border p-4 transition-shadow hover:shadow-md"
                                                style={{
                                                    borderLeft: `5px solid ${event.color}`,
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xl">
                                                                    {
                                                                        eventIcons[
                                                                            event
                                                                                .type
                                                                        ]
                                                                    }
                                                                </span>

                                                                <h3 className="truncate text-base font-semibold">
                                                                    {
                                                                        event.title
                                                                    }
                                                                </h3>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        setEditingEvent(
                                                                            event,
                                                                        );
                                                                        setCreatingEvent(
                                                                            true,
                                                                        );

                                                                        setData(
                                                                            {
                                                                                start_date:
                                                                                    event.start_date,
                                                                                end_date:
                                                                                    event.end_date ??
                                                                                    event.start_date,

                                                                                title: event.title,
                                                                                description:
                                                                                    event.description ??
                                                                                    '',

                                                                                type: event.type,
                                                                                visibility:
                                                                                    event.visibility,
                                                                                permissions:
                                                                                    event.permissions ??
                                                                                    [],
                                                                                color: event.color,

                                                                                all_day:
                                                                                    event.all_day,

                                                                                recurrence_type:
                                                                                    event.recurrence_type,

                                                                                repeat_interval:
                                                                                    event.repeat_interval,

                                                                                monthly_repeat_mode:
                                                                                    event.monthly_repeat_mode,

                                                                                week_of_month:
                                                                                    event.week_of_month,

                                                                                day_of_week:
                                                                                    event.day_of_week,
                                                                            },
                                                                        );
                                                                    }}
                                                                >
                                                                    <Edit className="h-4 w-4" />
                                                                </Button>

                                                                <Button
                                                                    size="sm"
                                                                    variant="destructive"
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

                                                        <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                                            <span className="rounded-full bg-muted px-2.5 py-1">
                                                                📅{' '}
                                                                {formatEventDate(
                                                                    event,
                                                                )}
                                                            </span>

                                                            <span className="rounded-full bg-muted px-2.5 py-1">
                                                                {(() => {
                                                                    if (
                                                                        event.visibility ===
                                                                        'public'
                                                                    ) {
                                                                        return '🌐 Public';
                                                                    }

                                                                    if (
                                                                        event.visibility ===
                                                                        'private'
                                                                    ) {
                                                                        return '🔒 Private';
                                                                    }

                                                                    const roles =
                                                                        (
                                                                            event.permissions ??
                                                                            []
                                                                        )
                                                                            .filter(
                                                                                (
                                                                                    permission: any,
                                                                                ) =>
                                                                                    permission.permission_type ===
                                                                                    'role',
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    permission: any,
                                                                                ) =>
                                                                                    permission.permission_value
                                                                                        .replace(
                                                                                            '_',
                                                                                            ' ',
                                                                                        )
                                                                                        .replace(
                                                                                            /\b\w/g,
                                                                                            (
                                                                                                letter: string,
                                                                                            ) =>
                                                                                                letter.toUpperCase(),
                                                                                        ),
                                                                            );

                                                                    return `👥 ${roles.join(' & ')} only`;
                                                                })()}
                                                            </span>

                                                            {event.recurrence_type !==
                                                                'none' && (
                                                                <span className="rounded-full bg-muted px-2.5 py-1">
                                                                    🔁{' '}
                                                                    {
                                                                        event.recurrence_type
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>

                                                        {event.description && (
                                                            <div className="mt-4 rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
                                                                {
                                                                    event.description
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
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
                                            title: '',
                                            description: '',

                                            start_date: format(
                                                selectedDate!,
                                                'yyyy-MM-dd',
                                            ),
                                            end_date: format(
                                                selectedDate!,
                                                'yyyy-MM-dd',
                                            ),

                                            all_day: true,

                                            visibility: 'public',

                                            permissions: [],

                                            type: 'event',

                                            color: '#3b82f6',

                                            recurrence_type: 'none',

                                            repeat_interval: 1,

                                            monthly_repeat_mode: 'day_of_month',

                                            week_of_month: 1,

                                            day_of_week: 0,
                                        });
                                    }}
                                >
                                    Add Event
                                </Button>
                            </>
                        </>
                    ) : (
                        // Event Creation Form
                        <>
                            <div className="space-y-5">
                                {/* General */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-muted-foreground">
                                        General
                                    </h3>

                                    <Input
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Event title"
                                    />

                                    <Textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Description (optional)"
                                        rows={4}
                                    />

                                    <Select
                                        value={data.type}
                                        onValueChange={(value) =>
                                            setData('type', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Event Type" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {eventTypes.map((type) => (
                                                <SelectItem
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Schedule */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-muted-foreground">
                                        Schedule
                                    </h3>

                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">
                                                Start Date
                                            </label>

                                            <Input
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) =>
                                                    setData(
                                                        'start_date',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-sm font-medium">
                                                End Date
                                            </label>

                                            <Input
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) =>
                                                    setData(
                                                        'end_date',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Settings */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-semibold text-muted-foreground">
                                        Settings
                                    </h3>

                                    <div className="space-y-3 rounded-lg border p-4 sm:col-span-2">
                                        <Select
                                            value={data.visibility}
                                            onValueChange={(value) =>
                                                setData('visibility', value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Visibility" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {visibilityOptions.map(
                                                    (visibility) => (
                                                        <SelectItem
                                                            key={
                                                                visibility.value
                                                            }
                                                            value={
                                                                visibility.value
                                                            }
                                                        >
                                                            {visibility.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {data.visibility === 'custom' && (
                                            <div className="space-y-3 rounded-lg border p-4">
                                                <Label>Visible To</Label>

                                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                    {availableRoles.map(
                                                        (role) => {
                                                            const checked =
                                                                data.permissions.some(
                                                                    (p) =>
                                                                        p.permission_type ===
                                                                            'role' &&
                                                                        p.permission_value ===
                                                                            role.value,
                                                                );

                                                            return (
                                                                <div
                                                                    key={
                                                                        role.value
                                                                    }
                                                                    className="flex items-center space-x-3 rounded-lg border p-3"
                                                                >
                                                                    <Checkbox
                                                                        id={
                                                                            role.value
                                                                        }
                                                                        checked={
                                                                            checked
                                                                        }
                                                                        onCheckedChange={(
                                                                            checked,
                                                                        ) => {
                                                                            if (
                                                                                checked
                                                                            ) {
                                                                                setData(
                                                                                    'permissions',
                                                                                    [
                                                                                        ...data.permissions,
                                                                                        {
                                                                                            permission_type:
                                                                                                'role',
                                                                                            permission_value:
                                                                                                role.value,
                                                                                        },
                                                                                    ],
                                                                                );
                                                                            } else {
                                                                                setData(
                                                                                    'permissions',
                                                                                    data.permissions.filter(
                                                                                        (
                                                                                            p,
                                                                                        ) =>
                                                                                            !(
                                                                                                p.permission_type ===
                                                                                                    'role' &&
                                                                                                p.permission_value ===
                                                                                                    role.value
                                                                                            ),
                                                                                    ),
                                                                                );
                                                                            }
                                                                        }}
                                                                    />

                                                                    <Label
                                                                        htmlFor={
                                                                            role.value
                                                                        }
                                                                        className="cursor-pointer font-normal"
                                                                    >
                                                                        {
                                                                            role.label
                                                                        }
                                                                    </Label>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <Select
                                            value={data.recurrence_type}
                                            onValueChange={(value) =>
                                                setData(
                                                    'recurrence_type',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Repeat" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {recurrenceOptions.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>

                                        {data.recurrence_type !== 'none' && (
                                            <div className="space-y-2">
                                                <Label>Interval</Label>

                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">
                                                        Every
                                                    </span>

                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        className="w-20"
                                                        value={
                                                            data.repeat_interval
                                                        }
                                                        onFocus={(e) =>
                                                            e.target.select()
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'repeat_interval',
                                                                Number(
                                                                    e.target
                                                                        .value,
                                                                ),
                                                            )
                                                        }
                                                    />

                                                    <span className="text-sm text-muted-foreground">
                                                        {
                                                            {
                                                                daily: 'day(s)',
                                                                weekly: 'week(s)',
                                                                monthly:
                                                                    'month(s)',
                                                                yearly: 'year(s)',
                                                            }[
                                                                data
                                                                    .recurrence_type
                                                            ]
                                                        }
                                                    </span>
                                                </div>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        {
                                                            daily: 'Occurs every selected number of days.',
                                                            weekly: 'Occurs every selected number of weeks.',
                                                            monthly:
                                                                'Occurs every selected number of months.',
                                                            yearly: 'Occurs every selected number of years.',
                                                        }[data.recurrence_type]
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {data.recurrence_type === 'monthly' && (
                                            <div className="space-y-4 rounded-lg border p-4">
                                                <Label>Repeat on</Label>

                                                <Select
                                                    value={
                                                        data.monthly_repeat_mode
                                                    }
                                                    onValueChange={(value) =>
                                                        setData(
                                                            'monthly_repeat_mode',
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        <SelectItem value="day_of_month">
                                                            Day of Month
                                                        </SelectItem>

                                                        <SelectItem value="weekday_of_month">
                                                            Weekday of Month
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>

                                                {data.monthly_repeat_mode ===
                                                    'weekday_of_month' && (
                                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                        <Select
                                                            value={String(
                                                                data.week_of_month,
                                                            )}
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                setData(
                                                                    'week_of_month',
                                                                    Number(
                                                                        value,
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>

                                                            <SelectContent>
                                                                {weekOptions.map(
                                                                    (week) => (
                                                                        <SelectItem
                                                                            key={
                                                                                week.value
                                                                            }
                                                                            value={String(
                                                                                week.value,
                                                                            )}
                                                                        >
                                                                            {
                                                                                week.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>

                                                        <Select
                                                            value={String(
                                                                data.day_of_week,
                                                            )}
                                                            onValueChange={(
                                                                value,
                                                            ) =>
                                                                setData(
                                                                    'day_of_week',
                                                                    Number(
                                                                        value,
                                                                    ),
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>

                                                            <SelectContent>
                                                                {weekdayOptions.map(
                                                                    (day) => (
                                                                        <SelectItem
                                                                            key={
                                                                                day.value
                                                                            }
                                                                            value={String(
                                                                                day.value,
                                                                            )}
                                                                        >
                                                                            {
                                                                                day.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <Select
                                        value={data.color}
                                        onValueChange={(value) =>
                                            setData('color', value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Color" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {colors.map((color) => (
                                                <SelectItem
                                                    key={color.value}
                                                    value={color.value}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-3 w-3 rounded-full border"
                                                            style={{
                                                                backgroundColor:
                                                                    color.value,
                                                            }}
                                                        />

                                                        {color.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button className="w-full" onClick={saveEvent}>
                                    {editingEvent
                                        ? 'Update Event'
                                        : 'Create Event'}
                                </Button>
                            </div>
>>>>>>> ad5c97e (Add the completed Calendar module)
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
