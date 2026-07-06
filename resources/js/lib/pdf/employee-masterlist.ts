import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '@/assets/logo.png';

interface Employee {
    id: number;
    name: string;
    designation: string;
    rate: number;
    ot_rate: number;
    trip_rate: number;
    status: string;
}

async function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
    });
}

export async function exportEmployeeMasterlist(employees: Employee[]) {
    const doc = new jsPDF();

    const img = await loadImage(logo);

    doc.addImage(img, 'PNG', 14, 10, 20, 20);

    doc.setFontSize(18);
    doc.text('Employee Masterlist', 40, 18);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 40, 25);

    autoTable(doc, {
        startY: 38,
        head: [
            [
                '#',
                'Employee',
                'Designation',
                'Daily Rate',
                'OT Rate',
                'Trip Rate',
                'Status',
            ],
        ],

        body: employees.map((employee) => [
            employee.id,
            employee.name,
            employee.designation,
            employee.rate,
            employee.ot_rate,
            employee.trip_rate,
            employee.status,
        ]),
    });

    doc.save('employee-masterlist.pdf');
}
