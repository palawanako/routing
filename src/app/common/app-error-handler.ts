import {ErrorHandler} from '@angular/core'
export class AppErrorHandler implements ErrorHandler{
    handleError(error){
        alert('unexpected error HAPPEND')
        console.log(error)
    }
}