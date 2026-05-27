import { Head } from "@inertiajs/react";

export default function Index() {

  return (
    <>
      <Head title="Payroll" />
    </>
  );
}

Index.layout = {
  breadcrumbs: [
    {
      title: 'Payroll',
      href: '/payroll',
    },
  ],
};
