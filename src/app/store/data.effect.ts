import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { ActionTrackerService } from '@core';
import { dataLoaded, loadData } from './data.actions';
import { DataService } from '../services';

@Injectable()
export class DataEffect {
  loadData$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(loadData),
        switchMap(() => {
          return this.dataService.getData()
            .pipe(
              tap((data: number[]) => this.actionTrackerService.sendSuccess(loadData.type, data)),
              map((data: number[]) => dataLoaded({ data })),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendFailure(loadData.type, error);
                return EMPTY;
              }),
            );
        }),
      );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly dataService: DataService,
    private readonly actionTrackerService: ActionTrackerService,
  ) {}
}
