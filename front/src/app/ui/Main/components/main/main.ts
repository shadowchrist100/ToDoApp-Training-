import { Component, computed, inject } from '@angular/core';
import { ShowTasks } from "../../../../features/tasks/components/dumb/show-tasks/show-tasks"
import { AddTask } from "../../../../features/tasks/components/smart/add-task/add-task";
import { TasksService } from '../../../../services/Tasks/tasks-service';

@Component({
    selector: 'app-main',
    imports: [ShowTasks, AddTask],
    templateUrl: './main.html',
    styleUrl: './main.css',
})
export class Main {
    constructor(){
        this.tasksService.getTasks();
    }
    tasksService = inject(TasksService);
    tasks = this.tasksService.tasks; 
    nbTasks = computed(() => this.tasks().length);
    todayTasks = computed(() => this.tasksService.getTodayTasks());
    nbTodayTasks = computed(() => this.todayTasks().length)
    tasksCompleted = computed(() => this.tasksService.getCompletedTasks());
    nbCompletedTasks = computed(() => this.tasksCompleted().length);
    nbAwaited = computed(() => this.nbTasks() - this.nbCompletedTasks())
}
