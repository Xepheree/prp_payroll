import { Button } from '@/components/ui/button';
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

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const days = useMemo(() => {
        const start = startOfWeek(startOfMonth(currentDate));
        const end = endOfWeek(endOfMonth(currentDate));

        return eachDayOfInterval({
            start,
            end,
        });
    }, [currentDate]);

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="rounded border p-2"
                >
                    <ChevronLeft size={18} />
                </Button>

                <h1 className="text-2xl font-bold">
                    {format(currentDate, 'MMMM yyyy')}
                </h1>

                <Button
                    variant="outline"
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
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
                {days.map((day) => (
                    <div
                        key={day.toISOString()}
                        className={`min-h-[120px] rounded-lg border p-2 transition ${
                            isSameMonth(day, currentDate)
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-muted/20 text-muted-foreground'
                        } ${
                            isSameDay(day, new Date())
                                ? 'border-2 border-red-600'
                                : ''
                        } `}
                    >
                        <div className="mb-2 font-semibold">
                            {format(day, 'd')}
                        </div>

                        <div className="space-y-1 text-xs">
                            {/* Events go here */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
