import { Form, Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    CalendarCheck2,
    CalendarDays,
    LayoutGrid,
    LockKeyhole,
    Megaphone,
    ShieldCheck,
    User,
} from 'lucide-react';

import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

const portalFeatures = [
    {
        icon: Megaphone,
        title: 'Announcements',
        description: 'Stay updated with company news and important notices.',
    },
    {
        icon: LayoutGrid,
        title: 'Dashboard',
        description: 'View your employee workspace and recent activity.',
    },
    {
        icon: CalendarCheck2,
        title: 'Leave Credits',
        description: 'Review available credits and leave history.',
    },
    {
        icon: CalendarDays,
        title: 'Leave Requests',
        description: 'Submit and monitor your leave applications.',
    },
];

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Employee Sign In" />

            <PasskeyVerify />

            <div className="flex min-h-svh w-full bg-background">
                {/* Login */}
                <div className="flex min-h-svh w-full flex-col lg:w-[46%]">
                    <header className="flex h-20 shrink-0 items-center px-6 sm:px-10 lg:px-14">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                                <User className="size-5" />
                            </div>

                            <div>
                                <p className="text-sm leading-none font-semibold">
                                    PRP Logistics
                                </p>

                                <p className="mt-1 text-xs text-muted-foreground">
                                    Human Resources Portal
                                </p>
                            </div>
                        </Link>
                    </header>

                    <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
                        <div className="w-full max-w-md">
                            <Link
                                href="/"
                                className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="size-4" />
                                Back to portal
                            </Link>

                            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                                <LockKeyhole className="size-5 text-primary" />
                            </div>

                            <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                                Welcome back
                            </h1>

                            <p className="mt-2 text-muted-foreground">
                                Sign in to access your employee workspace.
                            </p>

                            {status && (
                                <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                                    {status}
                                </div>
                            )}

                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="mt-8"
                            >
                                {({ processing, errors }) => (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">
                                                Email address
                                            </Label>

                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="h-11"
                                            />

                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>

                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-sm"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>

                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Enter your password"
                                                className="h-11"
                                            />

                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />

                                            <Label
                                                htmlFor="remember"
                                                className="cursor-pointer font-normal text-muted-foreground"
                                            >
                                                Keep me signed in
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="h-11 w-full"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing ? (
                                                <>
                                                    <Spinner />
                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    Sign in to portal
                                                    <ArrowRight className="ml-2 size-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </Form>

                            <div className="mt-8 border-t pt-6">
                                <div className="flex items-start gap-3">
                                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />

                                    <p className="text-xs leading-5 text-muted-foreground">
                                        This portal is restricted to authorized
                                        PRP Logistics employees. Account access
                                        is managed by your administrator.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </main>

                    <footer className="shrink-0 px-6 py-6 text-center text-xs text-muted-foreground">
                        © {new Date().getFullYear()} PRP Logistics. Employee
                        access only.
                    </footer>
                </div>

                {/* Portal Preview */}
                <div className="relative hidden min-h-svh flex-1 overflow-hidden bg-sidebar p-3 lg:flex">
                    <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-sidebar-border bg-sidebar text-sidebar-foreground">
                        {/* Decorative background */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-52 -right-52 size-[600px] rounded-full bg-primary/10 blur-[120px]" />

                            <div className="absolute -bottom-52 -left-52 size-[500px] rounded-full bg-primary/5 blur-[100px]" />
                        </div>

                        <div className="relative z-10 flex h-full flex-col p-10 xl:p-14">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-sidebar-foreground/60">
                                    <ShieldCheck className="size-4 text-primary" />
                                    Secure employee workspace
                                </div>

                                <div className="rounded-lg border border-sidebar-border bg-sidebar-accent px-3 py-1.5 text-xs text-sidebar-accent-foreground">
                                    HR Portal
                                </div>
                            </div>

                            <div className="my-auto max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full border border-sidebar-border bg-sidebar-accent/50 px-3 py-1.5 text-xs text-sidebar-foreground/70">
                                    <LayoutGrid className="size-3.5 text-primary" />
                                    NEXA Employee Workspace
                                </div>

                                <h2 className="mt-6 max-w-xl text-4xl font-semibold tracking-tight xl:text-5xl">
                                    Everything for your
                                    <span className="text-primary">
                                        {' '}
                                        workday
                                    </span>
                                    .
                                </h2>

                                <p className="mt-5 max-w-xl text-base leading-7 text-sidebar-foreground/60 xl:text-lg">
                                    Access your HR tools, employee information,
                                    and workplace updates through one
                                    centralized portal.
                                </p>

                                <div className="mt-10 grid grid-cols-2 gap-3">
                                    {portalFeatures.map((feature) => {
                                        const Icon = feature.icon;

                                        return (
                                            <div
                                                key={feature.title}
                                                className="group rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-5 transition-colors hover:bg-sidebar-accent"
                                            >
                                                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                                                    <Icon className="size-4 text-primary" />
                                                </div>

                                                <p className="mt-5 font-medium text-sidebar-foreground">
                                                    {feature.title}
                                                </p>

                                                <p className="mt-2 text-sm leading-5 text-sidebar-foreground/60">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-sidebar-border pt-6">
                                <p className="text-xs text-sidebar-foreground/40">
                                    Internal Human Resources System
                                </p>

                                <div className="flex items-center gap-2 text-xs text-sidebar-foreground/50">
                                    <div className="size-1.5 rounded-full bg-primary" />
                                    System available
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
