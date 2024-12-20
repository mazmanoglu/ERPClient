import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { OrderPipe } from '../../pipes/order.pipe';
import { CustomerModel } from '../../models/customer.model';
import { ProductModel } from '../../models/product.model';
import { OrderDetailModel } from '../../models/order-detail.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule, OrderPipe, RouterLink],
  providers: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  orders: OrderModel[] = [];
  customers: CustomerModel[] = [];
  products: ProductModel[] = [];
  createDetail: OrderDetailModel = new OrderDetailModel();
  updateDetail: OrderDetailModel = new OrderDetailModel();
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  createModel: OrderModel = new OrderModel();
  updateModel: OrderModel = new OrderModel();

  constructor(
    private http: HttpService,
    private swal: SwalService,
    private date: DatePipe // this is a service but not open to share. we need to write this with providers, and say that we want to use the service in this component
  ) {
    this.createModel.date = this.date.transform(new Date(), 'yyyy-MM-dd') ?? ''; //nullable
    this.createModel.deliveryDate =
      this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
    // Since the model is reset during the create process, we also write the necessary place for Date to the create method.
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllProducts();
    this.getAllCustomers();
  }

  getAll() {
    this.http.post<OrderModel[]>('Orders/GetAll', {}, (res) => {
      this.orders = res;
    });
  }

  getAllProducts() {
    this.http.post<ProductModel[]>('Products/GetAll', {}, (res) => {
      this.products = res;
    });
  }

  getAllCustomers() {
    this.http.post<CustomerModel[]>('Customers/GetAll', {}, (res) => {
      this.customers = res;
    });
  }

  addDetail() {
    const product = this.products.find(
      (p) => p.id == this.createDetail.productId
    );
    if (product) {
      this.createDetail.product = product;
    }
    this.createModel.details.push(this.createDetail);
    this.createDetail = new OrderDetailModel();
  }

  addUpdateDetail() {
    const product = this.products.find(
      (p) => p.id == this.updateDetail.productId
    );
    if (product) {
      this.updateDetail.product = product;
    }
    this.updateModel.details.push(this.updateDetail);
    this.updateDetail = new OrderDetailModel();
  }

  removeDetail(index: number) {
    this.createModel.details.splice(index, 1);
  }

  removeUpdateDetail(index: number) {
    this.updateModel.details.splice(index, 1);
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Orders/Create', this.createModel, (res) => {
        this.swal.callToas(res);
        this.createModel = new OrderModel();
        this.createModel.date =
          this.date.transform(new Date(), 'yyyy-MM-dd') ?? ''; //nullable
        this.createModel.deliveryDate =
          this.date.transform(new Date(), 'yyyy-MM-dd') ?? '';
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model: OrderModel) {
    // const number: string = 'TS' + model.orderNumberYear + model.orderNumber; we change this on backside
    this.swal.callSwal(
      'Delete Order!!',
      `Do you wanna delete ${model.customer.name}'s order? Number: ${model.number}`,
      () => {
        this.http.post<string>('Orders/DeleteById', { id: model.id }, (res) => {
          this.getAll();
          this.swal.callToas(res, 'info');
        });
      }
    );
  }

  get(model: OrderModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Orders/Update', this.updateModel, (res) => {
        this.swal.callToas(res, 'info');
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }
}
