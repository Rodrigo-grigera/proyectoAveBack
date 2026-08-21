import { Producto } from "./producto/entities/producto.entity";

export interface ResponseDto<T>{
    code: number;
    message: string;
    data?: T | T []
}