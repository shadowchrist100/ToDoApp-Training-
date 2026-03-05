import { Component, inject } from '@angular/core';
import { TasksService } from '../../../../services/Tasks/tasks-service';
import { option } from '../../../../models/option.model';
import { categorie } from '../../../../models/categorie.model';

@Component({
    selector: 'app-side-bar',
    imports: [],
    templateUrl: './side-bar.html',
    styleUrl: './side-bar.css',
})
export class SideBar {
    isAllActive = true;;
    isTodayActive = false;
    isUpcomingActive = false;
    isCompletedActive = false;
    tasksService = inject(TasksService)
    switchOption = this.tasksService.showOptions
    switchView(option: option ){
        this.switchOption.set(option)
        switch (option) {
            case "All":
                this.isAllActive = true;
                this.isTodayActive = this.isCompletedActive = this.isUpcomingActive = false;
                this.tasksService.categorieFilter.set(null);
                break;
            case 'Today':
                this.isTodayActive = true;
                this.isAllActive = this.isCompletedActive = this.isUpcomingActive = false;
                break;
            case 'Upcoming':
                this.isUpcomingActive = true;
                this.isAllActive = this.isCompletedActive = this.isTodayActive = false;
                break;
            case 'Completed':
                this.isCompletedActive = true;
                this.isAllActive = this.isUpcomingActive = this.isTodayActive = false
                break;
            default:
                break;
        }
    }
    filterByCategory(categorie: categorie){
        this.tasksService.categorieFilter.set(categorie); 
    }
}
