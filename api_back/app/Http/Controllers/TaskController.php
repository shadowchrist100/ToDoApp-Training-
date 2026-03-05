<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Task;

class TaskController extends Controller
{
    //
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:100',
            'description' => ['nullable', 'string', 'max:255'],
            'categorie' => ['required', Rule::in(['Travail', 'Personnel', 'Sante', 'Courses'])],
            'priorite' => ['required', Rule::in(['Haute', 'Normale', 'Basse'])],
            'echeance' => 'required|date',
        ]);
        $task = Task::create($validated);
        return response()->json($task, 201);
    }

    public function toggleTask(int $id)
    {
        $task = Task::findOrFail($id);
        $task->completed = !$task->completed; 
        $task->save();
        return response()->json($task);
    }

    public function deleteTask(int $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }

    public function getTask()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }
}
