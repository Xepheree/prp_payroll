<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollItem extends Model
{
    protected $fillable = [
        'payroll_id',
        'employee_id',

        'daily_rate',
        'trip_rate',

        'days_worked',
        'work_hours',
        'overtime_hours',

        'delivery_count',

        'basic_pay',
        'trip_pay',
        'overtime_pay',

        'deductions',

        'gross_pay',
        'net_pay',

        // Add these
        'outstanding_balance',
        'balance_recovery',
        'salary_released',
    ];

    protected $casts = [
        'daily_rate' => 'decimal:2',
        'trip_rate' => 'decimal:2',

        'work_hours' => 'decimal:2',
        'overtime_hours' => 'decimal:2',

        'basic_pay' => 'decimal:2',
        'trip_pay' => 'decimal:2',
        'overtime_pay' => 'decimal:2',

        'days_worked' => 'decimal:2',

        'deductions' => 'decimal:2',

        'gross_pay' => 'decimal:2',
        'net_pay' => 'decimal:2',

        // Add these
        'outstanding_balance' => 'decimal:2',
        'balance_recovery' => 'decimal:2',
        'salary_released' => 'decimal:2',
    ];

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
