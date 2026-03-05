import { Component, computed, inject, input, signal } from '@angular/core';
import { Itask } from '../../../../../models/task.model';
import { TasksService } from '../../../../../services/Tasks/tasks-service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-show-tasks',
    imports: [DatePipe],
    templateUrl: './show-tasks.html',
    styleUrl: './show-tasks.css',
})
export class ShowTasks {
    tasksService = inject(TasksService);
    tasks = input.required<Itask[]>();
    todayTasks = input.required<Itask[]>();
    completedTasks = input.required<Itask[]>();
    upcomingTasks = computed(() => this.tasksService.getUpcomingTasks());
    filtredTasks = computed(() => {
        switch (this.tasksService.showOptions()) {
            case 'Today':
                return this.todayTasks()
            case 'Upcoming':
                return this.upcomingTasks()
            case 'Completed':
                return this.completedTasks()
            default:
                return this.tasksService.filtredTasks()
        }
    })
    level :Record<string,number> = {
        "Basse": 0,
        "Normale": 1,
        "Haute": 2
    }
    sortOption = signal<'date' | 'priority' | 'none'>('none');
    showTasks = computed(() => {
        let list = this.filtredTasks();
        const option = this.sortOption();
        const sortedList = [...list];
        if (option === 'date') {
            sortedList.sort((a, b) => a.echeance.getTime() - b.echeance.getTime());
        } else if (option === 'priority') {
            sortedList.sort((a, b) => this.level[b.priorite] - this.level[a.priorite]);
        }

        return sortedList;
    })
    
    sortTasks(sort: "date" | "priority") {
        this.sortOption.set(this.sortOption() === sort ? 'none' : sort);
    }
    // tasks = this.tasksService.tasks
    loading = this.tasksService.loading
    showOptions = this.tasksService.showOptions;
    toggleTask(id: number) {
        this.tasksService.toggleTask(id);
    }
    deleteTask(id: number) {
        this.tasksService.deleteTask(id);
    }
}
