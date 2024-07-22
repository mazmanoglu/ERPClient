import { Pipe, PipeTransform } from '@angular/core';
import { WarehouseModel } from '../models/warehouse.model';

@Pipe({
  name: 'warehouse',
  standalone: true,
})
export class WarehousePipe implements PipeTransform {
  transform(value: WarehouseModel[], search: string): WarehouseModel[] {
    if (search) {
      return value;
    }
    return value.filter(
      (p) =>
        p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        p.fullAddress
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        p.postCode.toString().includes(search)
    );
  }
}
