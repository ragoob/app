import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverViewCardsComponent } from './over-view-cards.component';

describe('OverViewCardsComponent', () => {
  let component: OverViewCardsComponent;
  let fixture: ComponentFixture<OverViewCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverViewCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverViewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
