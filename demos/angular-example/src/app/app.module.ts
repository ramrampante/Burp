import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import {
  BurpAngularDashboardModule,
  BurpAngularStatusBarModule,
  BurpAngularDragDropModule,
  BurpAngularProgressBarModule,
  BurpAngularDashboardModalModule,
} from '@Burp' +
  /angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BurpAngularDashboardModule,
    BurpAngularStatusBarModule,
    BurpAngularDashboardModalModule,
    BurpAngularDragDropModule,
    BurpAngularProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
