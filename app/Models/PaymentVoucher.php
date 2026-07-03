<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentVoucher extends Model
{
    protected $fillable = [
        'voucher_number',
        'payment_date',
        'payment_method',
        'remarks',
    ];

    public function items()
    {
        return $this->hasMany(PaymentVoucherItem::class);
    }
}
