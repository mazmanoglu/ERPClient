import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { WarehousePipe } from '../../pipes/warehouse.pipe';
import { WarehouseModel } from '../../models/warehouse.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-warehouses',
  standalone: true,
  imports: [SharedModule, WarehousePipe],
  templateUrl: './warehouses.component.html',
  styleUrl: './warehouses.component.css',
})
export class WarehousesComponent implements OnInit {
  warehouses: WarehouseModel[] = [];
  search: string = '';

  @ViewChild('createModalCloseBtn') createModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  @ViewChild('updateModalCloseBtn') updateModalCloseBtn:
    | ElementRef<HTMLButtonElement>
    | undefined;
  createModel: WarehouseModel = new WarehouseModel();
  updateModel: WarehouseModel = new WarehouseModel();

  constructor(private http: HttpService, private swal: SwalService) {}
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.post<WarehouseModel[]>('Warehouses/GetAll', {}, (res) => {
      this.warehouses = res;
    });
  }

  create(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Warehouses/Create', this.createModel, (res) => {
        this.swal.callToas(res);
        this.createModel = new WarehouseModel();
        this.createModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }

  deleteById(model: WarehouseModel) {
    this.swal.callSwal(
      'Delete Warehouse!!',
      `Do you wanna delete the warehouse: ${model.name}`,
      () => {
        this.http.post<string>(
          'Warehouses/DeleteById',
          { id: model.id },
          (res) => {
            this.getAll();
            this.swal.callToas(res, 'info');
          }
        );
      }
    );
  }

  get(model: WarehouseModel) {
    this.updateModel = { ...model };
  }

  update(form: NgForm) {
    if (form.valid) {
      this.http.post<string>('Warehouses/Update', this.updateModel, (res) => {
        this.swal.callToas(res, 'info');
        this.updateModalCloseBtn?.nativeElement.click();
        this.getAll();
      });
    }
  }
}
