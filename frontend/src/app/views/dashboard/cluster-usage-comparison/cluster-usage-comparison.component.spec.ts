import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterUsageComparisonComponent } from './cluster-usage-comparison.component';

describe('ClusterUsageComparisonComponent', () => {
  let component: ClusterUsageComparisonComponent;
  let fixture: ComponentFixture<ClusterUsageComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterUsageComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterUsageComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
