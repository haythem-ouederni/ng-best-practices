import {async, TestBed} from '@angular/core/testing';
import {KeysModel} from '../../models';
import {KeysAndValuesFromObjectPipe} from './keys-and-values-from-object.pipe';

describe('KeysAndValuesFromObjectPipe', () => {
  let pipe: KeysAndValuesFromObjectPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [KeysAndValuesFromObjectPipe],
    });
  }));

  beforeEach(() => {
    pipe = TestBed.get(KeysAndValuesFromObjectPipe);
  });

  test('should return a list of keys', () => {
    const listKeys: string[] = ['toto', 'titi', 'tata'];
    const objectToTrasnform = {};
    listKeys.forEach(key => {
      objectToTrasnform[key] = key + key;
    });

    const transformedObjectList: KeysModel[] = pipe.transform(objectToTrasnform);

    const listKeysAfterTransformation: string[] = transformedObjectList.map(
      (transformedObject: KeysModel) => transformedObject.key as string
    );

    expect(listKeysAfterTransformation).toEqual(listKeys);
  });

  test('should return a list of values', () => {
    const listKeys: string[] = ['toto', 'titi', 'tata'];
    const listValues: string[] = ['totototo', 'titititi', 'tatatata'];
    const objectToTrasnform = {};
    listKeys.forEach(key => {
      objectToTrasnform[key] = key + key;
    });

    const transformedObjectList: KeysModel[] = pipe.transform(objectToTrasnform);

    const listValuiesAfterTransformation: string[] = transformedObjectList.map(
      (transformedObject: KeysModel) => transformedObject.value as string
    );

    expect(listValuiesAfterTransformation).toEqual(listValues);
  });

  test('should return empty list when empty object', () => {
    expect(pipe.transform({})).toEqual([]);
  });

  test('should return empty list when null', () => {
    expect(pipe.transform(null)).toEqual([]);
  });
});
