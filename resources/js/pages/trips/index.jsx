import { Head } from "@inertiajs/react";

export default function Index() {

  return (
    <>
      <Head title="Trips" />
    </>
  );
}

Index.layout = {
  breadcrumbs: [
    {
      title: 'Trips',
      href: '/trips',
    },
  ],
};
