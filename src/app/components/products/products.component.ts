import { productTypes } from './../../models/product.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { ProductModel } from '../../models/product.model';
import { HttpService } from '../../services/http.service';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal.service';
import { ProductPipe } from '../../pipes/product.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule, ProductPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: ProductModel[] = [];
  search: string = '';
  types = productTypes;

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  createModel: ProductModel = new ProductModel();
  updateModel: ProductModel = new ProductModel();

  constructor(private http: HttpService, private swal: SwalService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.post<ProductModel[]>('Products/Getall', {}, (res) => {
      this.products = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Products/Create', this.createModel, (res) => {
        this.swal.callToas(res);
        this.createModel = new ProductModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model: ProductModel) {
    this.swal.callSwal(
      'Delete Product!!',
      `Do you wanna delete the Product: ${model.name}`,
      () => {
        this.http.post<string>(
          'Products/DeleteById',
          { id: model.id },
          (res) => {
            this.getAll();
            this.swal.callToas(res, 'info');
          }
        );
      }
    );
  }

  get(model: ProductModel) {
    this.updateModel = { ...model };
    this.updateModel.typeValue = model.type.value;
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Products/Update', this.updateModel, (res) => {
        this.swal.callToas(res, 'info');
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }
}
