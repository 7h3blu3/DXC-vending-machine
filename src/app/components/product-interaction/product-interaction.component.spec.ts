import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInteractionComponent } from './product-interaction.component';

describe('ProductInteractionComponent', () => {
  let component: ProductInteractionComponent;
  let fixture: ComponentFixture<ProductInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductInteractionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
