import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCellRendererComponent } from './rank-cell-renderer.component';

describe('RankCellRendererComponent', () => {
  let component: RankCellRendererComponent;
  let fixture: ComponentFixture<RankCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
