import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MathQuestionComponent } from './math-question/math-question.component';
import { ProblemPanelComponent } from './problem-panel/problem-panel.component';
import { FormsModule } from '@angular/forms';
import { ConfigPanelComponent } from './config-panel/config-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MathQuestionComponent,
    ProblemPanelComponent,
    ConfigPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
