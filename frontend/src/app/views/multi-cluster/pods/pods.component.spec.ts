import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodsComponent } from './pods.component';

describe('PodsComponent', () => {
  let component: PodsComponent;
  let fixture: ComponentFixture<PodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
