import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VflAnchorDirective } from './vfl-anchor.directive';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    VflAnchorDirective,
    NavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    VflAnchorDirective,
    NavigationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
