import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditionComponent } from './question-edition.component';

describe('QuestionEditionComponent', () => {
  let component: QuestionEditionComponent;
  let fixture: ComponentFixture<QuestionEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
