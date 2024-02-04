import { EventEmitter, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { ActionTracker } from '../interfaces';

@Injectable()
export class ActionTrackerService {
  private readonly actions$ = new EventEmitter<ActionTracker>(true);

  getAction<TData = ActionTracker['data']>(actionName: ActionTracker['actionName']): Observable<TData> {
    return this.actions$
      .pipe(
        tap((action: ActionTracker) => {
          const isError = action.data instanceof Error || action.data instanceof HttpErrorResponse;

          if (isError) {
            throw action.data;
          }
        }),
        filter((action: ActionTracker) => action.actionName === actionName),
        map((action: ActionTracker) => action.data as TData),
        shareReplay({ refCount: true }),
      );
  }

  sendSuccess(actionName: ActionTracker['actionName'], data?: ActionTracker['data']): void {
    this.actions$.next({ actionName, data });
  }

  sendFailure(actionName: ActionTracker['actionName'], error: Error): void {
    this.actions$.next({ actionName, data: error });
  }
}
