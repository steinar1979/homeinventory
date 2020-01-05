import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HarryhandelComponent } from './harryhandel.component';

describe('HarryhandelComponent', () => {
  let component: HarryhandelComponent;
  let fixture: ComponentFixture<HarryhandelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HarryhandelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HarryhandelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
