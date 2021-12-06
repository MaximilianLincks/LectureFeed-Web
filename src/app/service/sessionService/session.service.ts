import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {SessionData} from "../../model/sessionData/session-data.model";
import {SessionCreateData} from "../../model/sessionCreateData/session-create-data.model";
import {firstValueFrom} from "rxjs";
import {Question} from "../../model/question/question.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends DefaultService{

  getInitialData(sessionId: number){
    return firstValueFrom(this.http.get<SessionData>(this.getAPIUrl()+`session/${sessionId}/initial`));
  }

  createSession(){
    return firstValueFrom(this.http.get<SessionCreateData>(this.getAPIUrl()+"session/create"));
  }

  createQuestion(sessionId: number, question: Question){
    return firstValueFrom(this.http.post<Question>(this.getAPIUrl()+`session/${sessionId}/question/create`, question));
  }

}
