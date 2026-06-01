import { Head } from '@inertiajs/react';
import ComingSoon from '@/components/custom/ComingSoon';

export default function Index() {
    return (
        <>
            <Head title="Cash Flow" />
            <ComingSoon />
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
