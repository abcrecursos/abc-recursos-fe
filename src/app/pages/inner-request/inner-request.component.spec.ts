import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerRequestComponent } from './inner-request.component';

describe('InnerRequestComponent', () => {
  let component: InnerRequestComponent;
  let fixture: ComponentFixture<InnerRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
