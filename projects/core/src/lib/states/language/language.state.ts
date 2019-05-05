import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {LANGUAGE_STATE_NAME, ListLanguages} from '../../core.constant';
import {LanguageUtilsService} from '../../utils/language/language-utils.service';
import {InitializeCurrentLanguage, UpdateCurrentLanguage, UpdateDefaultLanguage} from './language.action';

export interface LanguageStateModel {
  defaultLanguage: string;
  currentLanguage: string;
}

export const DEFAULT_LANGUAGE_STATE = {
  defaultLanguage: ListLanguages.EN,
  currentLanguage: null,
};

@State<LanguageStateModel>({
  name: LANGUAGE_STATE_NAME,
  defaults: DEFAULT_LANGUAGE_STATE,
})
export class LanguageState {
  constructor(private store: Store) {}

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Selectors ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  @Selector()
  static defaultLanguage(state: LanguageStateModel): string {
    return state.defaultLanguage;
  }

  @Selector()
  static currentLanguage(state: LanguageStateModel): string {
    return state.currentLanguage;
  }

  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Actions ///////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  @Action(InitializeCurrentLanguage)
  initializeCurrentLanguage(): Observable<any> {
    const browserLanguage: string = LanguageUtilsService.getBrowserLanguage();
    return this.store.dispatch(new UpdateCurrentLanguage(browserLanguage));
  }

  @Action(UpdateDefaultLanguage)
  updateDefaultLanguage({patchState}: StateContext<LanguageStateModel>, action: UpdateDefaultLanguage): void {
    patchState({defaultLanguage: action.defaultLanguage});
  }

  @Action(UpdateCurrentLanguage)
  updateCurrentLanguage({patchState}: StateContext<LanguageStateModel>, action: UpdateCurrentLanguage): void {
    patchState({currentLanguage: action.currentLanguage});
  }
}
