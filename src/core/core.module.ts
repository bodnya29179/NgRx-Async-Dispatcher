import { ModuleWithProviders, NgModule } from '@angular/core';
import { ActionDispatcherService, ActionTrackerService } from './services';

@NgModule({
  declarations: [],
  imports: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ActionDispatcherService,
        ActionTrackerService,
      ],
    };
  }
}
