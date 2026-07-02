<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeTransaction extends Model
{
    protected $fillable = [
        'employee_id',
        'type',
        'amount',
        'description',
        'payroll_id',
        'deduction_id',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function payroll()
    {
        return $this->belongsTo(Payroll::class);
    }

    public function deduction()
    {
        return $this->belongsTo(Deduction::class);
    }
}
