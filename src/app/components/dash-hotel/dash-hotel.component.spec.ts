import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashHotelComponent } from './dash-hotel.component';

describe('DashHotelComponent', () => {
  let component: DashHotelComponent;
  let fixture: ComponentFixture<DashHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashHotelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
