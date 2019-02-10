import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '@connection/lib/modules/main/services';

@Component({
  selector: 'con-connection',
  template: `
    <p>
      connection works! {{display}}
    </p>
  `,
  styles: []
})
export class ConnectionComponent implements OnInit {

  display: string;

  constructor(private connectionService: ConnectionService) { }

  ngOnInit() {
    this.display = this.connectionService.calcultate();
  }

}
