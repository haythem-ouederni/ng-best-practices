import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  constructor() {}

  calcultate(): string {
    return 'testing man';
  }
}
