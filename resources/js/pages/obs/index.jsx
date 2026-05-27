import { Head } from "@inertiajs/react";

export default function Index() {

  return (
    <>
      <Head title="Outstanding Balances" />
    </>
  );
}

Index.layout = {
  breadcrumbs: [
    {
      title: 'Outstanding Balances',
      href: '/obs',
    },
  ],
};
