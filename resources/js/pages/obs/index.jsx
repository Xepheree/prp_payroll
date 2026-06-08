import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus } from 'lucide-react';

export default function Index() {
  const balances = [
    {
      id: 1,
      employee: 'John Dela Cruz',
      balance: 2500,
      lastUpdated: '2026-06-08',
    },
    {
      id: 2,
      employee: 'Mark Santos',
      balance: 1000,
      lastUpdated: '2026-06-07',
    },
    {
      id: 3,
      employee: 'Paul Reyes',
      balance: 0,
      lastUpdated: '2026-06-06',
    },
  ];

  return (
    <>
      <Head title="Outstanding Balances" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Outstanding Balances
            </h1>

            <p className="text-muted-foreground">
              Employee balances and deductions (DUMMY DATA)
            </p>
          </div>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Balance
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employee Balances</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="border-r">
                      Employee
                    </TableHead>

                    <TableHead className="border-r">
                      Outstanding Balance
                    </TableHead>

                    <TableHead className="border-r">
                      Last Updated
                    </TableHead>

                    <TableHead>
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {balances.map((balance) => (
                    <TableRow key={balance.id}>
                      <TableCell className="border-r font-medium">
                        {balance.employee}
                      </TableCell>

                      <TableCell className="border-r">
                        ₱{balance.balance.toLocaleString()}
                      </TableCell>

                      <TableCell className="border-r">
                        {balance.lastUpdated}
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            View
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
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