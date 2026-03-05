import { Component } from '@angular/core';
import { SideBar } from "./ui/SideBar/components/side-bar/side-bar";
import { Main } from "./ui/Main/components/main/main";

@Component({
  selector: 'app-root',
  imports: [SideBar, Main],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ToDoApp';
}
