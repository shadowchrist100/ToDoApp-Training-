<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController; 

Route::post('/store',[TaskController::class, 'store'] );
Route::get('/getTasks',[TaskController::class, 'getTask'] );
Route::patch('/toggleTask/{id}', [TaskController::class, 'toggleTask'] );
Route::delete('/deleteTask/{id}', [TaskController::class, 'deleteTask'] );