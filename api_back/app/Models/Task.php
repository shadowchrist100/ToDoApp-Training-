<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $fillable =[
        'title',
        'description',
        'categorie',
        'priorite',
        'echeance',
    ];
    protected $casts = [
    'echeance' => 'datetime', 
    'completed' => 'boolean',
];
}
