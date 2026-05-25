import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralEmails } from './central-emails';

describe('CentralEmails', () => {
  let component: CentralEmails;
  let fixture: ComponentFixture<CentralEmails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentralEmails],
    }).compileComponents();

    fixture = TestBed.createComponent(CentralEmails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
