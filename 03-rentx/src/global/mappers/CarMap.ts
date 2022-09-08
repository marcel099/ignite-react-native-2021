import { CarModelDTO } from "../../database/models/Car";
import { CarServerDTO } from "../dtos/CarServerDTO";

export class CarMap {
  static fromCarServerToCarModel({
    id,
    brand,
    name,
    about,
    period,
    price,
    fuel_type,
    thumbnail,
  }: CarServerDTO): CarModelDTO {
    return {
      id,
      brand,
      name,
      about,
      period,
      price,
      fuel_type,
      thumbnail,
    }
  }
}