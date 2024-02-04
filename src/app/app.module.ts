import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CoreModule } from '@core';
import { AppComponent } from './app.component';
import { DataFacadeService, DataService } from './services';
import { DataEffect, dataReducer } from './store';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    StoreModule.forRoot({ data: dataReducer }),
    EffectsModule.forRoot([DataEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  declarations: [AppComponent],
  providers: [DataService, DataFacadeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
