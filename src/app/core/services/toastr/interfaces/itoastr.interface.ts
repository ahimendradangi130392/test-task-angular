import { IToastrOptions } from './itoastr-options.interface';

export interface IToastr {
    success(msg: string, title?: string, options?: IToastrOptions): void;
    info(msg: string, title?: string, options?: IToastrOptions): void;
    warning(msg: string, title?: string, options?: IToastrOptions): void;
    error(msg: string, title?: string, options?: IToastrOptions): void;
}