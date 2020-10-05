import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService {
    rentals: Rental[] = [{
        _id: '1',
        title: 'Central Apartment',
        city: 'monte carlo',
        street: 'castella',
        category: 'apartment',
        image: 'http://via.placeholder.com/350x250',
        numOfRooms: 5,
        description: 'Testing database',
        dailyPrice: 3500,
        shared: false,
        createdAt: '12-30-2020'
    },
    {
        _id: '2',
        title: 'view on the ocean',
        city: 'nica',
        street: 'este Normal',
        category: 'condo',
        image: 'http://via.placeholder.com/350x250',
        numOfRooms: 5,
        description: 'Testing database',
        dailyPrice: 900,
        shared: true,
        createdAt: '12-2-2021'
    },
    {
        _id: '3',
        title: 'view on the ocean',
        city: 'ljubljana',
        street: 'dunajska',
        category: 'house',
        image: 'http://via.placeholder.com/350x250',
        numOfRooms: 5,
        shared: true,
        description: 'Testing database',
        dailyPrice: 300,
        createdAt: '4-5-2019'
    },
    {
        _id: '4',
        title: 'view on the ocean',
        city: 'beograd',
        street: 'banovo brdo',
        category: 'apartment',
        image: 'http://via.placeholder.com/350x250',
        numOfRooms: 5,
        shared: true,
        description: 'Testing database',
        dailyPrice: 670,
        createdAt: '5-4-2013'
    }];

    // generic type Observable
    getRentals(): Observable<Rental[]> {
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.rentals);
            }, 200);
        });
    }

    // Get rental by id
    getRentalById(id: string): Observable<Rental> {
        return new Observable((observer) => {
            setTimeout(() => {
                observer.next(this.rentals.find(r => r._id === id))
            }, 100);
        });
    }
}
