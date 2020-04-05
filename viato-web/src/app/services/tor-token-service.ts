import { Injectable } from '@angular/core';

export interface TorToken {
  id: string;
  pipelineId: string;
  amount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TorTokenService {
  parseToken(token: string): TorToken|undefined{
    if (!token) return;

    const parsedToken = atob(token);
    const splittedToken = parsedToken.split(':');
    if (splittedToken.length != 4) return;
    return {
      id: splittedToken[0],
      pipelineId: splittedToken[1],
      amount: +splittedToken[2],
    }
  }
}
