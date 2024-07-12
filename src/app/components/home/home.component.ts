import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  /* constructor(private swal: SwalService) {
    this.swal.callSwal('Delete the records', 'Are you sure?', () => {
      alert('Successfully deleted');
    });
  } */
  
  /* constructor(
    private swal: SwalService
  ) {
    this.swal.callToas("Hello Hello", "success");
  } */
}
