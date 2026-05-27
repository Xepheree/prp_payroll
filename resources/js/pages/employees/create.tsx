import { Head, useForm } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        designation: '',
        rate: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/employees');
    };

    const designations = ['Admin', 'Driver', 'Helper', 'Cutter', 'Checker'];

    return (
        <>
            <Head title="Create a Product" />

            <div className="w-8/12 p-4">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 rounded-2xl border p-4"
                >
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(
                                        ([key, message]) => (
                                            <li key={key}>
                                                {message as string}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="name">Name</label>
                        <Input
                            type="text"
                            placeholder="Employee's Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="designation">Designation</label>

                        <Combobox
                            items={designations}
                            value={data.designation}
                            onValueChange={(value) =>
                                setData('designation', value)
                            }
                        >
                            <ComboboxInput placeholder="Select designation" />

                            <ComboboxContent>
                                <ComboboxEmpty>No items found.</ComboboxEmpty>

                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem key={item} value={item}>
                                            {item}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="price">Rate/Day</label>
                        <Input
                            type="number"
                            placeholder="Regular Day Pay"
                            value={data.rate}
                            onChange={(e) => setData('rate', e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="price">
                            Description
                            <span className="text-xs text-muted-foreground italic">
                                (Optional)
                            </span>
                        </label>
                        <Textarea
                            placeholder="Employee Description"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                    </div>
                    <Button type="submit">Add Employee</Button>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Create a New Employee',
            href: '/employees/create',
        },
    ],
};
