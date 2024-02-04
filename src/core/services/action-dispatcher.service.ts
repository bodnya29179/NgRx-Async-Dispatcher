import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { ActionTrackerService } from './action-tracker.service';

@Injectable()
export class ActionDispatcherService {
  constructor(
    private readonly store: Store,
    private readonly actionTrackerService: ActionTrackerService,
  ) {}

  async dispatchAsync(action: Action, actionName: string): Promise<any> {
    const actionResponse = firstValueFrom(this.actionTrackerService.getAction(actionName));

    this.store.dispatch(action);

    return actionResponse;
  }
}
