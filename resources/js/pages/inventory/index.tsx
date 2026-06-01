import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Inventory" />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: '/inventory',
        },
    ],
};
