import { HttpErrorResponse} from '@angular/common/http';

interface ApiError {
    title: string;
    detail: string;
}

export const extractApiError = (resError: HttpErrorResponse): BwmApi.Error[] => {
    // default error message
    let errors = [{title: 'Error!', detail: 'Ooops, something went wrong!'}];

    // response error
    if (resError && resError.error && resError.error.errors) {
        errors = resError.error.errors;
    }
    return errors;
};
