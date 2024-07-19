import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { CustomerModel } from '../../models/customer.model';
import { HttpService } from '../../services/http.service';
import { CustomerPipe } from '../../pipes/customer.pipe';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [SharedModule, CustomerPipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  customers: CustomerModel[] = [];
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  createModel: CustomerModel = new CustomerModel();
  updateModel: CustomerModel = new CustomerModel();

  constructor(private http: HttpService, private swal: SwalService) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.post<CustomerModel[]>('customers/getall', {}, (res) => {
      this.customers = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Customers/Create', this.createModel, (res) => {
        this.swal.callToas(res);
        this.createModel = new CustomerModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model: CustomerModel) {
    this.swal.callSwal(
      'Delete Customer!!',
      `Do you wanna delete the customer: ${model.name}`,
      () => {
        this.http.post<string>(
          'Customers/DeleteById',
          { id: model.id },
          (res) => {
            this.getAll();
            this.swal.callToas(res, 'info');
          }
        );
      }
    );
  }

  get(model: CustomerModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Customers/Update', this.updateModel, (res) => {
        this.swal.callToas(res, 'info');
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }
}
