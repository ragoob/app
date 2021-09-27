import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFromYamlFormComponent } from './load-from-yaml-form.component';

describe('LoadFromYamlFormComponent', () => {
  let component: LoadFromYamlFormComponent;
  let fixture: ComponentFixture<LoadFromYamlFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadFromYamlFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFromYamlFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
