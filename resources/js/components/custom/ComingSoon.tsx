import { Clock3 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

function ComingSoon() {
    return (
        <div className="flex items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardContent className="flex flex-col items-center gap-4 text-center">
                    <div className="rounded-full border">
                        <Clock3 className="h-8 w-8" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold">Coming Soon</h1>
                        <p className="mt-2 text-muted-foreground">
                            This module is currently under development.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default ComingSoon;
