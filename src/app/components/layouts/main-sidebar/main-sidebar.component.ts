import { Component } from '@angular/core';
import { Menus } from '../../../menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css'
})
export class MainSidebarComponent {
  menus = Menus
}
