import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable({
    providedIn: 'root'
})
export class RentalService {
    constructor(private http: HttpClient) {}

    // Get rental by id from server
    getRentalById(id: string): Observable<Rental> {
        return this.http.get<Rental>(`/api/rentals/${id}`);
    }

    // generic type Observable
    getRentals(): Observable<Rental[]> {
        return this.http.get<Rental[]>(`/api/rentals`);
    }
}
