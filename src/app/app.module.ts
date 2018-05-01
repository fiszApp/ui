import { QuestionService } from './question/question.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category-list/category.component';
import { CategoryService } from './category/category.service';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { CategoryEditionComponent } from './category/category-edition/category-edition.component';
import { CategoryNewComponent } from './category/category-new/category-new.component';
import { LoadingModule } from 'ngx-loading';
import { QuestionNewComponent } from './question/question-new/question-new.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    DashboardComponent,
    QuestionListComponent,
    CategoryEditionComponent,
    CategoryNewComponent,
    QuestionNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingModule
  ],
  providers: [CategoryService,
    QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
