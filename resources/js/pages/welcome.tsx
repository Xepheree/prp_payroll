import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    CalendarCheck2,
    CalendarDays,
    CheckCircle2,
    Clock3,
    FileText,
    Fingerprint,
    LockKeyhole,
    Plane,
    ShieldCheck,
    Sparkles,
    Users,
    Wallet,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard, login } from '@/routes';

const features = [
    {
        icon: CalendarDays,
        title: 'Attendance Tracking',
        description:
            'Review attendance records, working hours, and employee schedules from one centralized workspace.',
    },
    {
        icon: Wallet,
        title: 'Payroll & Payslips',
        description:
            'Access payroll history and review your payslip information securely whenever you need it.',
    },
    {
        icon: Plane,
        title: 'Leave Management',
        description:
            'Submit leave applications, monitor approval status, and review your available leave credits.',
    },
    {
        icon: Users,
        title: 'Employee Information',
        description:
            'Keep employee profiles and important account information organized and accessible.',
    },
];

export default function Welcome() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="PRP Logistics HR Portal" />

            <div className="min-h-screen bg-background text-foreground">
                {/* Navigation */}
                <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-white">
                                <Users className="size-5" />
                            </div>

                            <div>
                                <p className="text-sm leading-none font-semibold">
                                    PRP Logistics
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Human Resources
                                </p>
                            </div>
                        </Link>

                        <div className="flex items-center gap-3">
                            {/* <Button asChild size="sm">
                                <Link href={'/support'}>
                                    Support
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button> */}
                            <Button asChild size="sm">
                                <Link href={auth.user ? dashboard() : login()}>
                                    {auth.user
                                        ? 'Open Dashboard'
                                        : 'Employee Sign In'}

                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </header>

                <main>
                    {/* Hero */}
                    <section className="relative overflow-hidden">
                        <div className="absolute inset-0 -z-10">
                            <div className="absolute top-0 left-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

                            <div className="absolute right-0 bottom-0 size-[500px] rounded-full bg-primary/5 blur-3xl" />
                        </div>

                        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-28">
                            {/* Hero content */}
                            <div>
                                <Badge
                                    variant="outline"
                                    className="mb-6 rounded-full px-3 py-1"
                                >
                                    <Sparkles className="mr-1.5 size-3.5 text-primary" />
                                    PRP Logistics Employee Workspace
                                </Badge>

                                <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                                    Your workplace,
                                    <span className="block text-primary">
                                        all in one place.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
                                    Access attendance, payroll, leave requests,
                                    and employee information through one secure
                                    HR workspace built for the PRP Logistics
                                    team.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 bg-primary px-6"
                                    >
                                        <Link
                                            href={
                                                auth.user
                                                    ? dashboard()
                                                    : login()
                                            }
                                        >
                                            {auth.user
                                                ? 'Go to Dashboard'
                                                : 'Sign In to Portal'}

                                            <ArrowRight className="ml-2 size-4" />
                                        </Link>
                                    </Button>

                                    <div className="flex items-center gap-2 px-3 text-sm text-muted-foreground">
                                        <ShieldCheck className="size-4 text-primary" />
                                        Secure employee access
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t pt-7">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="size-4 text-primary" />
                                        Centralized records
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="size-4 text-primary" />
                                        Secure access
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <CheckCircle2 className="size-4 text-primary" />
                                        Real-time updates
                                    </div>
                                </div>
                            </div>

                            {/* Portal preview */}
                            <div className="relative hidden lg:block">
                                <div className="absolute -inset-12 rounded-full bg-primary/10 blur-3xl" />

                                <Card className="relative overflow-hidden border-border/60 bg-background/90 shadow-2xl shadow-black/10 backdrop-blur-xl">
                                    <div className="flex items-center justify-between border-b px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="size-2.5 rounded-full bg-red-400" />
                                            <div className="size-2.5 rounded-full bg-amber-400" />
                                            <div className="size-2.5 rounded-full bg-emerald-400" />
                                        </div>

                                        <div className="rounded-md bg-muted px-4 py-1.5 text-xs text-muted-foreground">
                                            PRP Logistics HR Portal
                                        </div>

                                        <div className="w-12" />
                                    </div>

                                    <CardContent className="space-y-5 p-6">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Welcome back
                                            </p>

                                            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                                                Employee Dashboard
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-xl border bg-muted/20 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
                                                        <CalendarCheck2 className="size-4 text-primary" />
                                                    </div>

                                                    <Badge
                                                        variant="secondary"
                                                        className="text-[10px]"
                                                    >
                                                        Today
                                                    </Badge>
                                                </div>

                                                <p className="mt-5 text-xs text-muted-foreground">
                                                    Attendance
                                                </p>

                                                <p className="mt-1 text-xl font-semibold">
                                                    Present
                                                </p>
                                            </div>

                                            <div className="rounded-xl border bg-muted/20 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                                                        <Plane className="size-4 text-blue-600" />
                                                    </div>
                                                </div>

                                                <p className="mt-5 text-xs text-muted-foreground">
                                                    Leave Credits
                                                </p>

                                                <p className="mt-1 text-xl font-semibold">
                                                    6.0
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-xl border">
                                            <div className="flex items-center justify-between border-b p-4">
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        Recent Activity
                                                    </p>

                                                    <p className="text-xs text-muted-foreground">
                                                        Your latest HR updates
                                                    </p>
                                                </div>

                                                <Clock3 className="size-4 text-muted-foreground" />
                                            </div>

                                            <div className="divide-y">
                                                <div className="flex items-center gap-3 p-4">
                                                    <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950">
                                                        <CheckCircle2 className="size-4 text-primary" />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium">
                                                            Leave request
                                                            approved
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            July 14, 2026
                                                        </p>
                                                    </div>

                                                    <Badge variant="secondary">
                                                        Approved
                                                    </Badge>
                                                </div>

                                                <div className="flex items-center gap-3 p-4">
                                                    <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950">
                                                        <FileText className="size-4 text-blue-600" />
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium">
                                                            Payslip available
                                                        </p>

                                                        <p className="text-xs text-muted-foreground">
                                                            July 12, 2026
                                                        </p>
                                                    </div>

                                                    <ArrowRight className="size-4 text-muted-foreground" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="absolute -right-8 -bottom-8 flex items-center gap-3 rounded-xl border bg-background p-4 shadow-xl">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
                                        <ShieldCheck className="size-5 text-primary" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">
                                            Secure Portal
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Protected employee access
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
                    <section className="border-y bg-muted/20">
                        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                            <div className="max-w-2xl">
                                <Badge variant="outline">Employee Portal</Badge>

                                <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    Everything you need for your workday.
                                </h2>

                                <p className="mt-4 text-muted-foreground">
                                    Essential HR tools organized into one
                                    simple, secure, and accessible workspace.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {features.map((feature) => {
                                    const Icon = feature.icon;

                                    return (
                                        <Card
                                            key={feature.title}
                                            className="group transition-all hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 transition-colors group-hover:bg-primary dark:bg-emerald-950">
                                                    <Icon className="size-5 text-primary transition-colors group-hover:text-white" />
                                                </div>

                                                <h3 className="mt-6 font-semibold">
                                                    {feature.title}
                                                </h3>

                                                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                                    {feature.description}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section>
                        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                            <div className="grid items-center gap-16 lg:grid-cols-2">
                                <div>
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950">
                                        <Fingerprint className="size-6 text-primary" />
                                    </div>

                                    <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                                        Built for secure employee access.
                                    </h2>

                                    <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
                                        The PRP Logistics HR Portal centralizes
                                        employee information while keeping
                                        access restricted to authorized
                                        personnel.
                                    </p>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Card>
                                        <CardContent className="p-6">
                                            <LockKeyhole className="size-5 text-primary" />

                                            <p className="mt-5 font-medium">
                                                Protected Access
                                            </p>

                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                Portal features are restricted
                                                to authenticated employees.
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-6">
                                            <ShieldCheck className="size-5 text-primary" />

                                            <p className="mt-5 font-medium">
                                                Role-Based Permissions
                                            </p>

                                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                                Administrative tools are
                                                available based on assigned
                                                employee roles.
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="px-6 pb-24 lg:px-8">
                        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-zinc-950 px-8 py-16 text-white sm:px-14 lg:px-20">
                            <div className="absolute top-0 right-0 size-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/20 blur-3xl" />

                            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm font-medium text-primary">
                                        PRP Logistics HR Portal
                                    </p>

                                    <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                                        Your employee workspace is ready.
                                    </h2>

                                    <p className="mt-4 max-w-xl text-zinc-400">
                                        Sign in to access your attendance,
                                        payroll, leave information, and employee
                                        records.
                                    </p>
                                </div>

                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 shrink-0 bg-primary px-6 text-white hover:bg-primary"
                                >
                                    <Link
                                        href={auth.user ? dashboard() : login()}
                                    >
                                        {auth.user
                                            ? 'Open Dashboard'
                                            : 'Sign In to Portal'}

                                        <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
                        <div className="flex items-center gap-2">
                            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-white">
                                <Users className="size-3.5" />
                            </div>

                            <span>PRP Logistics Human Resources</span>
                        </div>

                        <p>
                            © {new Date().getFullYear()} PRP Logistics. Employee
                            access only.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
