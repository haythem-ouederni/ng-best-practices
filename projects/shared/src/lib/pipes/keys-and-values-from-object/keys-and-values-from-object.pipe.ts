import {Pipe, PipeTransform} from '@angular/core';
import {KeysModel} from '../../models';

/**
 * Given an object, this pipe returns the list of its keys and their associated value
 */
@Pipe({name: 'keysAndValuesFromObject'})
export class KeysAndValuesFromObjectPipe implements PipeTransform {
  transform(value: any): KeysModel[] {
    const keys: KeysModel[] = [];
    for (const key in value) {
      if (key) {
        keys.push({key, value: value[key]});
      }
    }
    return keys;
  }
}
