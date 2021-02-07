import { Injectable } from "@angular/core";

import { ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  title: Subject<string> = new Subject();
  breadcrumbs: string;
  search: string;
  accountChanged: string;
  accountsSelected: ReplaySubject<[string]> = new ReplaySubject(1);
  accountsSelectDisabled: ReplaySubject<boolean> = new ReplaySubject(1);
  accountTypes$: ReplaySubject<[string]> = new ReplaySubject(1);
  remoteActionBroadcaster: Subject<string> = new Subject();

  constructor() {}
}
