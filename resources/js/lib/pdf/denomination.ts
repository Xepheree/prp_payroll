// resources/js/lib/pdf/denomination.ts

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '../utils';

interface PayrollItem {
    employee: {
        name: string;
        designation: string;
    };

    salary_released: number;
}

export function exportDenomination(
    items: PayrollItem[],
    startDate: string,
    endDate: string,
) {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
    });

    const totals = {
        thousand: 0,
        fiveHundred: 0,
        hundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        one: 0,
    };

    const rows = items.map((item) => {
        const d = getDenomination(Number(item.salary_released));

        totals.thousand += d.thousand;
        totals.fiveHundred += d.fiveHundred;
        totals.hundred += d.hundred;
        totals.fifty += d.fifty;
        totals.twenty += d.twenty;
        totals.ten += d.ten;
        totals.five += d.five;
        totals.one += d.one;

        return [
            item.employee.name,
            item.employee.designation,
            Number(item.salary_released).toLocaleString(),
            d.thousand,
            d.fiveHundred,
            d.hundred,
            d.fifty,
            d.twenty,
            d.ten,
            d.five,
            d.one,
        ];
    });

    const totalPayroll = items.reduce(
        (sum, item) => sum + Number(item.salary_released),
        0,
    );

    //
    // PAGE 2
    //

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);

    doc.text('Denomination Report', 148, 18, {
        align: 'center',
    });

    doc.setFontSize(12);

    doc.text('Total:', 20, 35);

    doc.setFontSize(16);

    doc.text(
        `PHP ${totalPayroll.toLocaleString(undefined, {
            minimumFractionDigits: 2,
        })}`,
        50,
        35,
    );

    doc.setFontSize(11);

    doc.text(`Date Started: ${formatDate(startDate)}`, 180, 30);
    doc.text(`Date Ended : ${formatDate(endDate)}`, 180, 38);

    const denominations = [
        {
            label: '1000',
            qty: totals.thousand,
            color: [226, 239, 218],
        },
        {
            label: '500',
            qty: totals.fiveHundred,
            color: [255, 229, 153],
        },
        {
            label: '100',
            qty: totals.hundred,
            color: [180, 198, 231],
        },
        {
            label: '50',
            qty: totals.fifty,
            color: [244, 153, 153],
        },
        {
            label: '20',
            qty: totals.twenty,
            color: [252, 229, 205],
        },
        {
            label: '10',
            qty: totals.ten,
            color: [255, 242, 204],
        },
        {
            label: '5',
            qty: totals.five,
            color: [255, 217, 102],
        },
        {
            label: '1',
            qty: totals.one,
            color: [217, 217, 217],
        },
    ];

    const startX = 20;
    const startY = 55;

    const cellWidth = 32;
    const cellHeight = 15;

    let x = startX;

    //
    // Header
    //

    denominations.forEach((d) => {
        doc.setFillColor(...d.color);

        doc.rect(x, startY, cellWidth, cellHeight, 'FD');

        doc.setFont('helvetica', 'bold');

        doc.text(d.label, x + cellWidth / 2, startY + 9, {
            align: 'center',
        });

        x += cellWidth;
    });

    //
    // Quantity Row
    //

    x = startX;

    denominations.forEach((d) => {
        doc.rect(x, startY + cellHeight, cellWidth, cellHeight);

        doc.setFontSize(16);

        doc.text(String(d.qty), x + cellWidth / 2, startY + 25, {
            align: 'center',
        });

        x += cellWidth;
    });

    //
    // Peso Value Row
    //

    x = startX;

    doc.setFontSize(10);

    denominations.forEach((d) => {
        doc.setFillColor(...d.color);

        doc.rect(x, startY + cellHeight * 2, cellWidth, cellHeight, 'FD');

        const amount = Number(d.label) * d.qty;

        doc.text(
            `PHP ${amount.toLocaleString()}`,
            x + cellWidth / 2,
            startY + 40,
            {
                align: 'center',
            },
        );

        x += cellWidth;
    });

    //
    // PAGE 1
    //

    doc.addPage();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('Denomination Report', 148, 15, {
        align: 'center',
    });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    doc.text(
        `Payroll Period: ${formatDate(startDate)} - ${formatDate(endDate)}`,
        14,
        23,
    );

    autoTable(doc, {
        startY: 30,

        head: [
            [
                'Employee',
                'Designation',
                'Salary',
                '1000',
                '500',
                '100',
                '50',
                '20',
                '10',
                '5',
                '1',
            ],
        ],

        body: rows,

        styles: {
            halign: 'center',
            valign: 'middle',
            fontSize: 9,
        },

        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: 'bold',
        },

        columnStyles: {
            0: { halign: 'left' },
            1: { halign: 'left' },
        },
    });

    doc.save(
        `Denomination-${formatDate(startDate)}-${formatDate(endDate)}.pdf`,
    );
}

export function getDenomination(amount: number) {
    let remaining = Math.round(amount);

    const thousand = Math.floor(remaining / 1000);
    remaining %= 1000;

    const fiveHundred = Math.floor(remaining / 500);
    remaining %= 500;

    const hundred = Math.floor(remaining / 100);
    remaining %= 100;

    const fifty = Math.floor(remaining / 50);
    remaining %= 50;

    const twenty = Math.floor(remaining / 20);
    remaining %= 20;

    const ten = Math.floor(remaining / 10);
    remaining %= 10;

    const five = Math.floor(remaining / 5);
    remaining %= 5;

    const one = remaining;

    return {
        thousand,
        fiveHundred,
        hundred,
        fifty,
        twenty,
        ten,
        five,
        one,
    };
}
