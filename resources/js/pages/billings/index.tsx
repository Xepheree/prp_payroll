import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Billings" />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Billings',
            href: '/billings',
        },
    ],
};
