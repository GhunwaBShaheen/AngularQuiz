import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CustomBusyComponent } from './CustomBusy/CustomBusyComponent';
import { BusyConfig, NgBusyModule } from 'ng-busy';
import { NgxSpinnerModule } from 'ngx-spinner';

export function busyConfigFactory(): any {
  return new BusyConfig({
    message: 'Please wait...',
    backdrop: true,
    template: CustomBusyComponent,
    delay: 200,
    minDuration: 600,
    disableAnimation: true,
  });
}

@NgModule({
  declarations: [AppComponent, HeaderComponentComponent, CustomBusyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxSpinnerModule,
    NgBusyModule,
  ],
  providers: [{ provide: BusyConfig, useFactory: busyConfigFactory }],
  bootstrap: [AppComponent],
})
export class AppModule {}
