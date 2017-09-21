import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorPageComponent } from './floor-page.component';

describe('FloorPageComponent', () => {
  let component: FloorPageComponent;
  let fixture: ComponentFixture<FloorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
