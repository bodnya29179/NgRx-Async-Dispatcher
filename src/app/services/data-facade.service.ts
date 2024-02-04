import { Injectable } from '@angular/core';
import { ActionDispatcherService } from '@core';
import { loadData } from '../store';

@Injectable()
export class DataFacadeService {
  constructor(private readonly actionDispatcher: ActionDispatcherService) {}

  async loadData(): Promise<number[]> {
    return await this.actionDispatcher.dispatchAsync(
      loadData(),
      loadData.type,
    );
  }
}
