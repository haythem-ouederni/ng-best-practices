export enum LanguageActionTypes {
  InitializeCurrentLanguage = '[Language] Initialize current language',
  UpdateDefaultLanguage = '[Language] Update default language',
  UpdateCurrentLanguage = '[Language] Update current language',
}

export class InitializeCurrentLanguage {
  static readonly type = LanguageActionTypes.InitializeCurrentLanguage;
}

export class UpdateDefaultLanguage {
  static readonly type = LanguageActionTypes.UpdateDefaultLanguage;
  constructor(public defaultLanguage: string) {}
}

export class UpdateCurrentLanguage {
  static readonly type = LanguageActionTypes.UpdateCurrentLanguage;
  constructor(public currentLanguage: string) {}
}
