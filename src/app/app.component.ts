import { Component, OnInit } from '@angular/core';
import { DataFacadeService } from './services';

@Component({
  selector: 'app-root',
  template: `
    @if (isLoading) {
      Loading...
    } @else {
      Data: {{ data || 'failed to load' }}
    }
  `,
  styles: []
})
export class AppComponent implements OnInit {
  isLoading = false;
  data: number[];

  constructor(private readonly dataFacadeService: DataFacadeService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData(): Promise<void> {
    try {
      this.isLoading = true;

      this.data = await this.dataFacadeService.loadData();
      console.log('success', this.data);
    } catch (error) {
      console.log('failure', error);
    } finally {
      this.isLoading = false;
    }
  }
}
