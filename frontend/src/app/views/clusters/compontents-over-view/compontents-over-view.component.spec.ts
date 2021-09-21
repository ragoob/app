import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompontentsOverViewComponent } from './compontents-over-view.component';

describe('CompontentsOverViewComponent', () => {
  let component: CompontentsOverViewComponent;
  let fixture: ComponentFixture<CompontentsOverViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompontentsOverViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompontentsOverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
