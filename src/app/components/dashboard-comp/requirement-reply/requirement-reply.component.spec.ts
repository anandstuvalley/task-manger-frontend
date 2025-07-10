import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementReplyComponent } from './requirement-reply.component';

describe('RequirementReplyComponent', () => {
  let component: RequirementReplyComponent;
  let fixture: ComponentFixture<RequirementReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementReplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
