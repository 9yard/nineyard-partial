import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCellRendererComponent } from './note-cell-renderer.component';

describe('NoteCellRendererComponent', () => {
  let component: NoteCellRendererComponent;
  let fixture: ComponentFixture<NoteCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
