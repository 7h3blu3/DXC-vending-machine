import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinInsertComponent } from './coin-insert.component';

describe('CoinInsertComponent', () => {
  let component: CoinInsertComponent;
  let fixture: ComponentFixture<CoinInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
