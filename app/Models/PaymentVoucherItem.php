<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentVoucherItem extends Model
{
    protected $fillable = [
        'payment_voucher_id',
        'employee_transaction_id',
    ];

    public function voucher()
    {
        return $this->belongsTo(PaymentVoucher::class, 'payment_voucher_id');
    }

    public function transaction()
    {
        return $this->belongsTo(EmployeeTransaction::class, 'employee_transaction_id');
    }
}
