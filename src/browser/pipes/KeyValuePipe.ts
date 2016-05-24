import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keyvalue', pure: false })
export default class KeyValuePipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        if (typeof value != 'object') return [];
        return Object.keys(value).map(key => ({ key, value: value[key] }));
    }
}