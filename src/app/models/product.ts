export type UnitOfMeasure = 'EA' | 'LF';

export interface Product {
  readonly id: string;
  readonly description: string;
  readonly unitOfMeasure: UnitOfMeasure;
  readonly listPrice: number;
}
