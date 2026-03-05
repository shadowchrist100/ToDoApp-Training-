import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Itask } from '../../../../../models/task.model';
import { categorie } from '../../../../../models/categorie.model';
import { priorite } from '../../../../../models/priorite.model';

@Component({
    selector: 'app-add-task-form',
    imports: [ReactiveFormsModule],
    templateUrl: './add-task-form.html',
    styleUrl: './add-task-form.css',
})
export class AddTaskForm {
    taskForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        description: new FormControl('', [Validators.maxLength(30)]),
        categorie: new FormControl<categorie>('Courses' , [Validators.required]),
        priorite: new FormControl<priorite>('Basse', [Validators.required]),
        echeance: new FormControl<Date>(new Date(), [Validators.required])
    })
    tasks = output<Itask>();

    addTask(){
        const {title, description,categorie,priorite,echeance} = this.taskForm.value;
        const task = {title,description,categorie,priorite,echeance};
        this.tasks.emit(task as Itask)
        this.taskForm.reset();
    }
}
