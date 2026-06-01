import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Trucks" />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Trucks',
            href: '/trucks',
        },
    ],
};
