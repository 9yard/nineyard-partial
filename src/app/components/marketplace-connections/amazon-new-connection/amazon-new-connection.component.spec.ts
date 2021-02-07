import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonNewConnectionComponent } from './amazon-new-connection.component';

describe('AmazonNewConnectionComponent', () => {
  let component: AmazonNewConnectionComponent;
  let fixture: ComponentFixture<AmazonNewConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmazonNewConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmazonNewConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
