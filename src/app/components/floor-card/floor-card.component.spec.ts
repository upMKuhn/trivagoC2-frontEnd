import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorCardComponent } from './floor-card.component';

describe('FloorCardComponent', () => {
  let component: FloorCardComponent;
  let fixture: ComponentFixture<FloorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
