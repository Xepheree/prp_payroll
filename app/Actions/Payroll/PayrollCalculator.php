<?php

namespace App\Actions\Payroll;

use App\Models\Attendance;
use App\Models\Deduction;
use App\Models\EmployeeTransaction;
use App\Models\Payroll;
use App\Models\PayrollItem;
use App\Models\Trip;

class PayrollCalculator
{
  public function preview(Payroll $payroll): array
  {
    $attendance = Attendance::with([
      'items.employee',
    ])->findOrFail($payroll->attendance_id);

    $items = $attendance->items
      ->groupBy('employee_id')
      ->map(function ($employeeItems) use ($attendance, $payroll) {

        $employee = $employeeItems->first()->employee;

        /*
                |--------------------------------------------------------------------------
                | Attendance Summary
                |--------------------------------------------------------------------------
                */

        $daysWorked = 0;
        $workHours = 0;
        $overtimeHours = 0;

        foreach ($employeeItems as $item) {

          $hours = $item->work_hours;

          if ($hours >= 8) {
            $daysWorked += 1;
          } elseif ($hours > 0) {
            $daysWorked += $hours / 8;
          }

          $workHours += min(8, $hours);

          $overtimeHours += max(0, $hours - 8);
        }

        /*
                |--------------------------------------------------------------------------
                | Trips
                |--------------------------------------------------------------------------
                */

        $deliveries = Trip::query()
          ->when(
            $payroll->status === 'draft',
            fn($q) => $q->whereNull('payroll_id')
          )
          ->whereBetween('trip_date', [
            $attendance->period_start,
            $attendance->period_end,
          ])
          ->where('trip_type', 'deliver')
          ->where(function ($query) use ($employee) {
            $query->where('driver_id', $employee->id)
              ->orWhere('helper_id', $employee->id);
          })
          ->get();

        $deliveryCount = $deliveries->count();

        /*
                |--------------------------------------------------------------------------
                | Deductions
                |--------------------------------------------------------------------------
                */

        $employeeDeductions = Deduction::query()
          ->when(
            $payroll->status === 'draft',
            fn($q) => $q->whereNull('payroll_id')
          )
          ->where('employee_id', $employee->id)
          ->whereBetween('date', [
            $attendance->period_start,
            $attendance->period_end,
          ])
          ->get();

        $deductions = $employeeDeductions->sum('amount');

        /*
                |--------------------------------------------------------------------------
                | Payroll Computation
                |--------------------------------------------------------------------------
                */

        $basicPay = $daysWorked * $employee->rate;

        $tripPay = $deliveryCount * ($employee->trip_rate ?? 0);

        $overtimePay = $overtimeHours * $employee->ot_rate;

        $grossPay = $basicPay + $tripPay + $overtimePay;

        $netPay = $grossPay - $deductions;

        return [
          'employee' => $employee,

          'days_worked' => round($daysWorked, 2),

          'work_hours' => $workHours,
          'overtime_hours' => $overtimeHours,

          'delivery_count' => $deliveryCount,

          'daily_rate' => $employee->rate,
          'trip_rate' => $employee->trip_rate,
          'ot_rate' => $employee->ot_rate,

          'basic_pay' => $basicPay,
          'trip_pay' => $tripPay,
          'overtime_pay' => $overtimePay,

          'deductions' => $deductions,

          'gross_pay' => $grossPay,
          'net_pay' => $netPay,

          // Used during finalize()
          'delivery_ids' => $deliveries->pluck('id'),
          'deduction_ids' => $employeeDeductions->pluck('id'),
        ];
      })
      ->values();

    return [
      'items' => $items,
      'summary' => [
        'employees' => $items->count(),
        'gross_pay' => $items->sum('gross_pay'),
        'net_pay' => $items->sum('net_pay'),
      ],
    ];
  }

  public function finalize(Payroll $payroll): void
  {
    $preview = $this->preview($payroll);

    foreach ($preview['items'] as $item) {

      PayrollItem::create([
        'payroll_id' => $payroll->id,
        'employee_id' => $item['employee']->id,

        'daily_rate' => $item['daily_rate'],
        'trip_rate' => $item['trip_rate'],

        'days_worked' => $item['days_worked'],
        'work_hours' => $item['work_hours'],
        'overtime_hours' => $item['overtime_hours'],

        'delivery_count' => $item['delivery_count'],

        'basic_pay' => $item['basic_pay'],
        'trip_pay' => $item['trip_pay'],
        'overtime_pay' => $item['overtime_pay'],

        'deductions' => $item['deductions'],

        'gross_pay' => $item['gross_pay'],
        'net_pay' => $item['net_pay'],
      ]);

      EmployeeTransaction::create([
        'employee_id' => $item['employee']->id,

        'type' => 'payroll',

        'amount' => -$item['net_pay'],

        'description' => sprintf(
          'Payroll %s - %s',
          $payroll->start_date,
          $payroll->end_date
        ),

        'payroll_id' => $payroll->id,
      ]);

      if ($item['delivery_ids']->isNotEmpty()) {
        Trip::whereIn('id', $item['delivery_ids'])
          ->update([
            'payroll_id' => $payroll->id,
          ]);
      }

      if ($item['deduction_ids']->isNotEmpty()) {
        Deduction::whereIn('id', $item['deduction_ids'])
          ->update([
            'payroll_id' => $payroll->id,
          ]);
      }
    }

    $payroll->update([
      'status' => 'finalized',
    ]);
  }
}
