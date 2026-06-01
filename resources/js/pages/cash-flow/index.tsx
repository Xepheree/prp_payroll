import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Cash Flow" />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Cash Flow',
            href: '/cash-flow',
        },
    ],
};
