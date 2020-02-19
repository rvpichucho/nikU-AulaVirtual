import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteCreateUpdateComponent } from './docente-create-update.component';

describe('DocenteCreateUpdateComponent', () => {
  let component: DocenteCreateUpdateComponent;
  let fixture: ComponentFixture<DocenteCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
