import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'upper'
})

export class UppercasePipe implements PipeTransform {
    transform(value: string, mode?: string): string {
        if (!value || typeof value !== 'string') {
            return '';
        }

        if (mode === 'firstLetterUpper') {
            return value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        }

        return value.toUpperCase();
    }
}

@Pipe({
    name: 'firtsUpperLetter'
})
export class FirstUpperLetterPipe implements PipeTransform {
    transform(value: string) {
        if (!value || typeof value !== 'string') { return ''; }
        return value.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    }
}