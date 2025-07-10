import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementChatComponent } from './requirement-chat.component';

describe('RequirementChatComponent', () => {
  let component: RequirementChatComponent;
  let fixture: ComponentFixture<RequirementChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequirementChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequirementChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
