import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterModulePageComponent } from './register-module-page.component';

describe('RegisterModulePageComponent', () => {
  let component: RegisterModulePageComponent;
  let fixture: ComponentFixture<RegisterModulePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterModulePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterModulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
