import { Head } from '@inertiajs/react';
import ComingSoon from '@/components/custom/ComingSoon';

export default function Index() {
    return (
        <>
            <Head title="Budget" />
            <ComingSoon />
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
