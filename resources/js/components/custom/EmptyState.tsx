// resources/js/components/custom/EmptyState.tsx

import { Button } from '@/components/ui/button';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    onAction,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full border p-6">📂</div>

            <h3 className="text-xl font-semibold">{title}</h3>

            <p className="mt-2 max-w-md text-muted-foreground">{description}</p>

            {actionLabel && onAction && (
                <Button className="mt-6" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
