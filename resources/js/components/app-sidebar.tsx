import { Link, usePage } from '@inertiajs/react';
import {
    Banknote,
    Building2,
    BusFront,
    CalendarCheck,
    Clipboard,
    HandCoins,
    LayoutGrid,
    PhilippinePeso,
    PiggyBank,
    ReceiptText,
    Truck,
    User,
    Warehouse,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { auth } = usePage().props as any;

    const isAdmin =
        auth.user.role === 'admin' || auth.user.role === 'superadmin';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },

        ...(isAdmin
            ? [
                  {
                      title: 'Employee Masterlist',
                      href: '/employees',
                      icon: User,
                  },
                  {
                      title: 'Trips',
                      href: '/trips',
                      icon: Truck,
                  },
                  {
                      title: 'Outstanding Balances',
                      href: '/obs',
                      icon: HandCoins,
                  },
                  {
                      title: 'Payroll',
                      href: '/payroll',
                      icon: PhilippinePeso,
                  },
                  //   {
                  //       title: 'Payment Vouchers',
                  //       href: '/payment-vouchers',
                  //       icon: ReceiptText,
                  //   },
                  //   {
                  //       title: 'Billings',
                  //       href: '/billings',
                  //       icon: Clipboard,
                  //   },
                  //   {
                  //       title: 'Inventory',
                  //       href: '/inventory',
                  //       icon: Warehouse,
                  //   },
                  //   {
                  //       title: 'Cash Flow',
                  //       href: '/cash-flow',
                  //       icon: Banknote,
                  //   },
              ]
            : []),
    ];

    const footerNavItems: NavItem[] = [
        ...(isAdmin
            ? [
                  {
                      title: 'Attendance',
                      href: '/attendance',
                      icon: CalendarCheck,
                  },
                  {
                      title: 'Available Trucks',
                      href: '/trucks',
                      icon: BusFront,
                  },
                  {
                      title: 'Companies',
                      href: '/companies',
                      icon: Building2,
                  },
                  // {
                  //     title: 'Budget',
                  //     href: '/budget',
                  //     icon: PiggyBank,
                  // },
              ]
            : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
