import {ROUTES_PATHS} from '@abpe/connection/lib/modules';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Navigate} from '@ngxs/router-plugin';
import {Store} from '@ngxs/store';
import {environment} from '../../../environments/environment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  title = this.translateService.instant('app.title_2');

  env = environment.production;

  subscriptions: Subscription = new Subscription();

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Constructor ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  constructor(private store: Store, private translateService: TranslateService) {}

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Life cycle ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  ngOnInit(): void {
    // Notice : here using the translateService stream instead of get to listen to the keys change
    // when changing the language
    const translationSubscription: Subscription = this.translateService.stream('app.title_2').subscribe((translation: string) => {
      this.title = translation;
    });
    this.subscriptions.add(translationSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Navigayion ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  goToPageOne() {
    this.store.dispatch(new Navigate([environment.connection.basePath, ROUTES_PATHS.pageOne]));
  }
}
