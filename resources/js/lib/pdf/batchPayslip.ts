import jsPDF from 'jspdf';
import { formatDate } from '../utils';
import { drawPayslip } from './payslip';

export async function exportBatchPayslips(
    items: PayrollItem[],
    startDate: string,
    endDate: string,
) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const payrollPeriod = `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`;

    const positions = [
        { x: 0, y: 0 },
        { x: 105, y: 0 },
        { x: 0, y: 148 },
        { x: 105, y: 148 },
    ];

    for (let i = 0; i < items.length; i++) {
        const position = positions[i % 4];

        await drawPayslip(
            doc,
            items[i],
            startDate,
            endDate,
            position.x,
            position.y,
            0.7,
            true,
        );

        if ((i + 1) % 4 === 0 && i !== items.length - 1) {
            doc.addPage();
        }
    }

    doc.save(`Payroll Payslips - ${payrollPeriod}.pdf`);
}
