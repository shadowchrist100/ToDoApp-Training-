import { Component, inject } from "@angular/core";
import { AddTaskForm } from "../../dumb/add-task-form/add-task-form";
import { Itask } from "../../../../../models/task.model";
import { TasksService } from "../../../../../services/Tasks/tasks-service";

@Component({
    selector: "app-add-task",
    imports: [AddTaskForm],
    templateUrl: "./add-task.html",
    styleUrl: "./add-task.css",
})
export class AddTask {
    taskService = inject(TasksService);
    addTask(newTasks : Itask) {        
        this.taskService.addTask(newTasks)
    }
}
