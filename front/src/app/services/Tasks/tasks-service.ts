import { computed, inject, Injectable, signal } from '@angular/core';
import { Itask } from '../../models/task.model';
import { HttpClient } from '@angular/common/http';
import { option } from '../../models/option.model';
import { categorie } from '../../models/categorie.model';

const API_BASE_URL = "http://localhost:8000/api"

@Injectable({
    providedIn: "root"
}
)
export class TasksService {
    http = inject(HttpClient);
    loading = signal(false);
    readonly #tasksSignal = signal<Itask[]>([]);
    readonly tasks = this.#tasksSignal.asReadonly();
    showOptions = signal<option>("All");
    categorieFilter = signal<"Travail" | "Personnel" | "Courses" | "Sante" | null>(null)
    
    filtredTasks = computed(() => {
        const allTasks = this.#tasksSignal();
        const currentCat = this.categorieFilter();
        return currentCat ? allTasks.filter(t => t.categorie === currentCat) : allTasks;
    })
    getTasks() {
        this.loading.set(true);
        this.http.get<Itask[]>(`${API_BASE_URL}/getTasks`).subscribe({
            next: (tasks) => {
                tasks = tasks.map((task) => {
                    task.echeance = new Date(task.echeance)
                    return task;
                })
                this.#tasksSignal.set(tasks);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        })
    }
    getTodayTasks() {
        const today = new Date();
        return this.#tasksSignal().filter(task => { return task.echeance.toDateString() === today.toDateString() });
    }
    getCompletedTasks() {
        return this.#tasksSignal().filter(task => task.completed)
    }
    getUpcomingTasks() {
        const today = new Date();
        return this.#tasksSignal().filter(task => { return task.echeance > today });
    }
    toggleTask(id: number) {
        this.http.patch<Itask>(`${API_BASE_URL}/toggleTask/${id}`, {}).subscribe((updateTask) => {
            this.#tasksSignal.update(tasks => tasks.map(task => {
                if (task.id === id) {
                    updateTask.echeance = new Date(updateTask.echeance);
                    return updateTask;
                }
                return task
            }))
        })
    }
    addTask(task: Itask) {
        this.http.post<Itask>(`${API_BASE_URL}/store`, task).subscribe((taskAdd) => {
            taskAdd.echeance = new Date(taskAdd.echeance);
            this.#tasksSignal.update(tasks => [...tasks, taskAdd])
        })
    }
    deleteTask(id: number) {
        this.http.delete(`${API_BASE_URL}/deleteTask/${id}`).subscribe(() => {
            this.#tasksSignal.update(tasks => tasks.filter(task => task.id !== id))
        })
    }
}
