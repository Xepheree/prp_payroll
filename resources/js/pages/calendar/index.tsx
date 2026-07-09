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
import { useForm, usePage } from '@inertiajs/react';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
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

                                    setData({
                                        date: format(day, 'yyyy-MM-dd'),
                                        title: '',
                                        description: '',
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

                    <Input
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        placeholder="Event title"
                    />

                    <Select
                        value={data.color}
                        onValueChange={(value) => setData('color', value)}
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
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Description"
                    />

                    <Button
                        onClick={() =>
                            post('/calendar', {
                                onSuccess: () => {
                                    toast.success(
                                        'Event created successfully.',
                                    );

                                    setSelectedDate(null);

                                    setData({
                                        date: '',
                                        title: '',
                                        description: '',
                                        color: 'blue',
                                    });
                                },
                                onError: () => {
                                    toast.error('Unable to save event.');
                                },
                            })
                        }
                    >
                        Save
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}
