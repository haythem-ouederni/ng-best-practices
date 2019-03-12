import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  calculated = 'testing';

  calculate(): string {
    return this.calculated;
  }
}
