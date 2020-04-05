import {Product} from './product';

export interface OrderLine {
  readonly id: string;
  readonly quantity: number;
  readonly salePrice: number;
  readonly product: Product;
}

