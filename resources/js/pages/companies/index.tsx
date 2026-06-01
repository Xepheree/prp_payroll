import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Companies" />
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Companies',
            href: '/companies',
        },
    ],
};
