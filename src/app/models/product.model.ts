export class ProductModel {
  id: string = '';
  name: string = '';
  quantity: number = 0;
  price: number = 0;
  type: ProductTypeEnum = new ProductTypeEnum();
  typeValue: number = 1;
}

export class ProductTypeEnum {
  name: string = '';
  value: number = 1;
}

export const productTypes: ProductTypeEnum[] = [
  {
    name: 'Product',
    value: 1
  },
  {
    name: 'Semi Product',
    value: 2
  }
]
