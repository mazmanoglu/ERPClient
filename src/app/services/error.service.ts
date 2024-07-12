import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private swal: SwalService) {}

  errorHandler(err: HttpErrorResponse) {
    console.log(err);
    if (err.status === 403) {
      let errorMessage = '';
      for (const e of err.error.ErrorMessages) {
        errorMessage += e + '\n';
      }
      this.swal.callToas(errorMessage, 'error');
    } else if (err.status === 500) {
      this.swal.callToas(err.error.errorMessages[0], 'error');
    }
  }
}
