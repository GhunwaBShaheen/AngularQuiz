import { Component, Inject } from '@angular/core';
import { InstanceConfigHolderService } from 'ng-busy';

@Component({
  selector: 'custom-busy',
  template: `
    <ngx-spinner
      size="medium"
      color="black"
      type="ball-atom"
      bdColor="rgb(32 33 35 / 11%)"
      [fullScreen]="true"
      ><p style="color: black">{{ message }}</p>
    </ngx-spinner>
  `,
})
export class CustomBusyComponent {
  constructor(
    @Inject('instanceConfigHolder')
    private instanceConfigHolder: InstanceConfigHolderService
  ) {}

  get message(): string | undefined {
    return this.instanceConfigHolder.config.message;
  }
}
