import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { CustomerModel } from '../../models/customer.model';
import { HttpService } from '../../services/http.service';
import { CustomerPipe } from '../../pipes/customer.pipe';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SharedModule, CustomerPipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customers: CustomerModel[] = [];
  search: string = "";

  constructor(private http: HttpService) { }
  ngOnInit(): void {
    this.getAll();
  }
  
  getAll() {
    this.http.post<CustomerModel[]>("customers/getall", {}, (res) => {
      this.customers = res; 
      
    });
  }
}
