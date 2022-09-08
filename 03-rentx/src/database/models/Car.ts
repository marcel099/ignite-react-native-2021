import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export interface CarModelDTO {
  id: string;
  brand: string;
  name: string;
  about: string;
  period: string;
  price: number;
  fuel_type: string;
  thumbnail: string;
}

export class Car extends Model implements CarModelDTO {
  static table = 'cars';

  @field('name')
  name!: string;

  @field('brand')
  brand!: string;
  
  @field('about')
  about!: string;

  @field('fuel_type')
  fuel_type!: string;

  @field('period')
  period!: string;

  @field('price')
  price!: number;

  @field('thumbnail')
  thumbnail!: string;
}