import { QuestionNewComponent } from './question/question-new/question-new.component';
import { CategoryNewComponent } from './category/category-new/category-new.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category-list/category.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'questions/:id', component: QuestionListComponent },
  { path: 'questions', component: QuestionListComponent },
  { path: 'category-new', component: CategoryNewComponent },
  { path: 'question-new', component: QuestionNewComponent },
  { path: 'question-new/:categoryId', component: QuestionNewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
