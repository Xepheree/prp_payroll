import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Budget" />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Budget',
            href: '/budget',
        },
    ],
};
