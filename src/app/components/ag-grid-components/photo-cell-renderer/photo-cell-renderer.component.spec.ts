import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoCellRendererComponent } from './photo-cell-renderer.component';

describe('PhotoCellRendererComponent', () => {
  let component: PhotoCellRendererComponent;
  let fixture: ComponentFixture<PhotoCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
