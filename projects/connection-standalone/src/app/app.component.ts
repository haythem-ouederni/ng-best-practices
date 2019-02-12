import {Component} from '@angular/core';
import {environment} from '@connection-standalone/environments/environment';

@Component({
  selector: 'app-root',
  template: '{{title}} <br> <con-connection></con-connection>',
})
export class AppComponent {
  title = environment.title;
}
