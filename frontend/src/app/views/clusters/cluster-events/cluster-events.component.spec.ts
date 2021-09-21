import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterEventsComponent } from './cluster-events.component';

describe('ClusterEventsComponent', () => {
  let component: ClusterEventsComponent;
  let fixture: ComponentFixture<ClusterEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
