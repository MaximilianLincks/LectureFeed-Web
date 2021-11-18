import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ParticipantSessionComponent} from './paricipant-session.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ParticipantSessionComponent', () => {
  let component: ParticipantSessionComponent;
  let fixture: ComponentFixture<ParticipantSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[MessageService],
      declarations: [ParticipantSessionComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
