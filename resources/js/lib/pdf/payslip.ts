import jsPDF from 'jspdf';

import logo from '@/assets/logo.png';
import { formatDate, loadImage } from '../utils';

interface Employee {
    name: string;
    designation: string;
}

interface PayrollItem {
    employee: Employee;

    days_worked: number;
    overtime_hours: number;
    delivery_count: number;

    basic_pay: number;
    trip_pay: number;
    overtime_pay: number;

    gross_pay: number;

    outstanding_balance: number;
    balance_recovery: number;
    salary_released: number;
}

function moneyRow(
    doc: jsPDF,
    label: string,
    amount: number,
    x: number,
    y: number,
    bold = false,
    scale = 1,
) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');

    doc.text(label, x + 10 * scale, y);

    doc.text(
        `PHP ${Number(amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`,
        x + 128 * scale,
        y,
        {
            align: 'right',
        },
    );
}

export async function drawPayslip(
    doc: jsPDF,
    item: PayrollItem,
    startDate: string,
    endDate: string,
    x: number,
    y: number,
    scale = 1,
    drawBorder = false,
) {
    const width = 148 * scale; // A5 width
    const height = 210 * scale; // A5 height

    if (drawBorder) {
        doc.setDrawColor(0);
        doc.setLineWidth(0.2);
        doc.rect(x + 2, y + 2, width - 4, height - 4);
    }

    const X = (value: number) => x + value * scale;
    const Y = (value: number) => y + value * scale;
    const image = await loadImage(logo);
    const payrollPeriod = `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`;

    doc.addImage(image, 'PNG', X(10), Y(10), 28 * scale, 28 * scale);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16 * scale);

    // TITLE
    doc.text('PRP 413 LOGISTICS', X(105 / 2 + 18), Y(16), {
        align: 'center',
    });

    doc.text('EMPLOYEE PAYSLIP', X(105 / 2 + 18), Y(23), {
        align: 'center',
    });

    doc.text(`${payrollPeriod}`, X(105 / 2 + 18), Y(29), {
        align: 'center',
    });

    doc.setFont('helvetica', 'bold');

    // EMPLOYEE INFORMATION

    doc.setFont('helvetica', 'bold');

    doc.text('Name:', X(10), Y(45));
    doc.text('Position:', X(10), Y(52));
    doc.text('Paid Days:', X(10), Y(59));

    doc.text('OT:', X(87), Y(45));
    doc.text('Trip:', X(87), Y(52));

    doc.setFont('helvetica', 'normal');

    doc.text(item.employee.name, X(50), Y(45));

    doc.text(
        item.employee.designation.charAt(0).toUpperCase() +
            item.employee.designation.slice(1),
        X(50),
        Y(52),
    );

    doc.text(`${item.days_worked}`, X(50), Y(59));

    doc.text(`${item.overtime_hours} hrs`, X(108), Y(45));

    doc.text(`${item.delivery_count}`, X(108), Y(52));

    // EARNINGS
    doc.setLineWidth(0.3);

    doc.line(X(10), Y(65), X(138), Y(65));

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11 * scale);

    doc.text('EARNINGS', X(10), Y(74));

    moneyRow(doc, 'Basic Pay', item.basic_pay, x, Y(82), false, scale);
    moneyRow(doc, 'Trip Incentive', item.trip_pay, x, Y(89), false, scale);
    moneyRow(doc, 'OT Pay', item.overtime_pay, x, Y(96), false, scale);

    moneyRow(doc, 'Gross Pay', item.gross_pay, x, Y(107), true, scale);

    moneyRow(
        doc,
        'Outstanding Balance',
        item.outstanding_balance,
        x,
        Y(128),
        false,
        scale,
    );

    moneyRow(
        doc,
        'Recovered This Payroll',
        item.balance_recovery,
        x,
        Y(135),
        false,
        scale,
    );

    moneyRow(
        doc,
        'Salary Released',
        item.salary_released,
        x,
        Y(146),
        true,
        scale,
    );

    doc.line(X(10), Y(100), X(128), Y(100));

    moneyRow(doc, 'Gross Pay', item.gross_pay, x, Y(107), true, scale);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11 * scale);

    doc.text('BALANCE RECOVERY', X(10), Y(120));

    moneyRow(
        doc,
        'Outstanding Balance',
        item.outstanding_balance,
        x,
        Y(128),
        false,
        scale,
    );

    moneyRow(
        doc,
        'Recovered This Payroll',
        item.balance_recovery,
        x,
        Y(135),
        false,
        scale,
    );

    doc.line(X(10), Y(139), X(128), Y(139));

    moneyRow(
        doc,
        'Salary Released',
        item.salary_released,
        x,
        Y(146),
        true,
        scale,
    );

    // SIGNATURE

    const signatureY = Y(175);

    doc.line(X(15), signatureY, X(60), signatureY);
    doc.line(X(80), signatureY, X(125), signatureY);

    doc.text('Employee Signature', X(37.5), signatureY + 6, {
        align: 'center',
    });

    doc.text('Authorized By', X(102.5), signatureY + 6, {
        align: 'center',
    });

    doc.setFontSize(8 * scale);
    doc.setTextColor(120);

    doc.text(`Generated on ${new Date().toLocaleString()}`, X(10), Y(200));

    doc.text('PRP Payroll Management System', X(138), Y(200), {
        align: 'right',
    });

    doc.setTextColor(0);
}

export async function exportPayslip(
    item: PayrollItem,
    startDate: string,
    endDate: string,
) {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5',
    });

    await drawPayslip(doc, item, startDate, endDate, 0, 0, 1);

    doc.save(`Payslip-${item.employee.name.replace(/\s+/g, '-')}.pdf`);
}
