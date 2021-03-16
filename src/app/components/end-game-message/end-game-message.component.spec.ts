import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndGameMessageComponent } from './end-game-message.component';

describe('LooseMessageComponent', () => {
  let component: EndGameMessageComponent;
  let fixture: ComponentFixture<EndGameMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndGameMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndGameMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
