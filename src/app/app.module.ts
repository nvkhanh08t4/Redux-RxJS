import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTutorialComponent } from './components/create-tutorial/create-tutorial.component';
import { ReadTutorialComponent } from './components/read-tutorial/read-tutorial.component';

const COMPONENTS = [
  AppComponent,
  CreateTutorialComponent,
  ReadTutorialComponent
];

const MODULES = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ConfirmationPopoverModule.forRoot({
    confirmButtonType: 'danger'
  })
];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
