import {LanguageState, ListLanguages, UpdateCurrentLanguage} from '@abpe/core';
import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  listAvailableLanguage: string[];

  @Select(LanguageState.currentLanguage) currentLanguage: Observable<string>;

  selectedLanguage: string;

  listLanguages = ListLanguages;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.listAvailableLanguage = Object.keys(ListLanguages);
    this.selectedLanguage = this.store.selectSnapshot(LanguageState.defaultLanguage);
  }

  /**
   * Method called when the user changes the current language
   */
  changeLanguage(language: string): void {
    const languageCode: string = this.listLanguages[language];
    this.selectedLanguage = languageCode;
    this.store.dispatch(new UpdateCurrentLanguage(languageCode));
  }
}
