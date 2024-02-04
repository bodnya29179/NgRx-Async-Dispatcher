# 🚀 NgRx Async Dispatcher

## 📖 Overview

This project aims to enhance the asynchronous handling of NgRx actions in Angular applications by introducing two
essential services: `ActionDispatcherService` and `ActionTrackerService`.

## 🌟 Benefits of this Approach

### Simplified Async Actions

The approach simplifies the dispatching of NgRx actions in an asynchronous manner, reducing boilerplate
code and improving code readability.

### Consistent Error Handling

Developers can handle errors without the need to create additional NgRx Actions for error handling.
The solution streamlines the error reporting process, providing a more straightforward and centralized approach to
managing asynchronous errors.

### Automatic Success Tracking

It eliminates the need for extra operations with NgRx Selectors to listen for the success of dispatched actions.
By using the `ActionTrackerService`, developers can seamlessly track the success of asynchronous operations and
pass relevant data back to the corresponding promise created by the `ActionDispatcherService`.

### Improved Code Organization

Centralizing asynchronous action handling with these services promotes cleaner and more organized code. Developers can
focus on the logic of their actions and effects without being burdened by the intricacies of error management and
success tracking.

### Enhanced Testability

Easy for testing, simplifies processes like mocking and stubbing. This approach enhances test clarity and issue
identification in Angular.

## 📚 Documentation

### `ActionDispatcherService`

The `ActionDispatcherService` is designed to simplify the dispatching of NgRx actions in an asynchronous manner. It
provides a method, `dispatchAsync`, which allows for the asynchronous execution of NgRx actions. Developers can leverage
this service to streamline the handling of asynchronous actions within their Angular services.

#### Usage

Inject `ActionDispatcherService` into your Angular service where you want to handle asynchronous NgRx Actions.

#### Methods

`dispatchAsync(action: Action, actionName: string): Promise<any>`

- Dispatches the provided NgRx Action asynchronously.
- Takes two parameters:
    - `action`: The NgRx Action to be dispatched.
    - `actionName`: A unique string representing the action/operation.

##
### `ActionTrackerService`

The `ActionTrackerService` provides a mechanism to track the success or failure of dispatched actions. It includes
methods, such as `sendSuccess` and `sendFailure`, which enable developers to communicate the outcome of asynchronous
operations back to the `ActionDispatcherService`. This service promotes consistent error handling and success
signaling in NgRx Effects.

#### Usage:

Inject `ActionTrackerService` to handle success and failure scenarios.

#### Methods

`sendSuccess(actionName: string, data: any): void`

- Sends a success signal to the async dispatcher.
- Takes two parameters:
    - `actionName`: The unique string representing the action.
    - `data`: Data to be passed to the `dispatchAsync` method. It's optional.

`sendFailure(actionName: string, error: any): void`

- Sends a failure signal to the async dispatcher.
- Errors can be handled in the `try/catch` structure.
- Takes two parameters:
  - `actionName`: The unique string representing the action.
  - `error`: The error object to be passed to the dispatchAsync method.

## 💡 Examples

These examples demonstrate how to integrate the `ActionDispatcherService` in an Angular service for dispatching
asynchronous actions and how to use the `ActionTrackerService` within an NgRx Effect for success and failure tracking.
Developers can adapt this approach to enhance asynchronous action handling in their Angular applications.

1. Use the `ActionDispatcherService` in Angular Service:

```typescript
import { Injectable } from '@angular/core';
import { ActionDispatcherService } from '@core';
import { yourAction } from './your-actions'; // Import your NgRx action

@Injectable()
export class YourService {
  /* Inject the service */
  constructor(private readonly actionDispatcher: ActionDispatcherService) {}

  async doSomething(): Promise<any> {
    return await this.actionDispatcher.dispatchAsync(
      /* Action that will be dispatched */
      yourAction(),
      /* You can use enum for operation names */
      '<unique operation name>',
    );
  }
}
```

2. `ActionTrackerService` in NgRx Effect:

```typescript
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { ActionTrackerService } from '@core';
import { YourHttpService } from './your-http-service';
import { yourAction, yourActionSuccess } from './your-actions'; // Import your NgRx actions

@Injectable()
export class YourEffect {
  yourAction$ = createEffect(() => {
    return this.actions$
      .pipe(
        /* Get the dispatched action */
        ofType(yourAction),
        switchMap(() => {
          /* Calling the HTTP-request */
          return this.yourHttpService.someRequest()
            .pipe(
              /* Sends a success signal to the `dispatchAsync` */
              tap((data: any) => this.actionTrackerService.sendSuccess('<unique operation name>', data)),
              /* Return a success-action to process the HTTP-response in the NgRx Reducer */
              map((data: any) => yourActionSuccess({ data })),
              catchError((error: any) => {
                /* Sends a failure signal to the `dispatchAsync` */
                this.actionTrackerService.sendFailure(loadData.type, error);
                return EMPTY;
              }),
            );
        }),
      );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly yourHttpService: YourHttpService,
    private readonly actionTrackerService: ActionTrackerService,
  ) {}
}
```

3. Dispatching action in component:

```typescript
import { Component } from '@angular/core';
import { YourService } from './your-service'; // Import your service

@Component({
  selector: 'app-your-component',
  template: `
    <div *ngIf="isLoading; else content">
      Loading...
    </div>

    <ng-template #content>
      <!-- Display your data here -->
      {{ data | json }}
    </ng-template>
  `,
})
export class YourComponent {
  isLoading: boolean;
  data: any;

  constructor(private readonly yourService: YourService) {
  }

  async ngOnInit(): void {
    this.isLoading = true;

    try {
      this.data = await this.yourService.doSomething();
    } catch (error) {
      /* Handle the error appropriately, e.g., show an error message to the user */
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }
}
```

###
Feel free to explore and adapt these benefits to suit your specific use cases and project requirements 🎉.
