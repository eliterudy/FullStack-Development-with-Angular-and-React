import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor() {}

  getAllLeaders = (): Promise<Leader[]> => {
    return of(LEADERS).pipe(delay(2000)).toPromise() as Promise<Leader[]>;
  };

  getLeader = (id: string): Promise<Leader> => {
    return of(LEADERS.filter((leader) => leader.id === id)[0])
      .pipe(delay(2000))
      .toPromise() as Promise<Leader>;
  };

  getFeaturedLeader = (): Promise<Leader> => {
    return of(LEADERS.filter((leader) => leader.featured)[0])
      .pipe(delay(2000))
      .toPromise() as Promise<Leader>;
  };
}
