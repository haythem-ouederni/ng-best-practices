import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {NgxsModule} from '@ngxs/store';
import {LanguageState} from './states';

@NgModule({
  imports: [HttpClientModule, NgxsModule.forFeature([LanguageState])],
})
export class CoreModule {}
