import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IToastrOptions } from '../services/toastr/interfaces/itoastr-options.interface'

@Injectable({ providedIn: 'root' })
export class NotificationService {
    constructor(
        private toastService: ToastrService,
    ) { }

    showError(message: string, title?: string, options?: IToastrOptions): void {
        this.toastService.error(message, title ? `ERROR: ${title}` : 'ERROR', options);
    }

    showSuccessMessage(message: string, title?: string, options?: IToastrOptions): void {
        this.toastService.success(message, title, options);
    }

    showWarn(message: string, title: string = 'Warning', options?: IToastrOptions): void {
        this.toastService.warning(message, title, options);
    }

    showInfo(message: string, title: string = 'Information', options?: IToastrOptions): void {
        this.toastService.info(message, title, options);
    }

    showValidationError(data: any, title?: string, options?: IToastrOptions): void {
        if (!data || !data.error) {
            return;
        }
        if (data.error.message === 'ERRORS.VALIDATION') {
            this.toastService.error(data.error.errors.message, title, options);
        } else {
            this.toastService.error(data.error, title, options);
        }
    }

}
