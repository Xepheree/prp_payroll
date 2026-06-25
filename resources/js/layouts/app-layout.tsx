import { usePage } from '@inertiajs/react';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs,
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    const page = usePage();

    const pageBreadcrumbs = (page.props.breadcrumbs as BreadcrumbItem[]) ?? [];

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs ?? pageBreadcrumbs}>
            {children}
        </AppLayoutTemplate>
    );
}
