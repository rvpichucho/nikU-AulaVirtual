import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteCreateUpdateComponent } from './estudiante-create-update.component';

describe('EstudianteCreateUpdateComponent', () => {
  let component: EstudianteCreateUpdateComponent;
  let fixture: ComponentFixture<EstudianteCreateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteCreateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
