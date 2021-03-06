import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';

import {Observable} from 'rxjs/Observable'
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardapiService {

  
  public dashBoardFilterObservable: Observable<Object>;
  public dashBoardFilterObserver:Observer<Object>;
  public dashBoardFilterGradeObservable: Observable<Object>;
  public dashBoardFilterGradeObserver:Observer<Object>;
  constructor(private http:Http) {
    this.dashBoardFilterObservable= new Observable(observer=>{
       this.dashBoardFilterObserver = observer;
     });
     this.dashBoardFilterGradeObservable=new Observable((observer)=>{
       this.dashBoardFilterGradeObserver =observer;
     })
   }

   public dashBoardApiHandler(){
     var header = {
       'Authorization': 'DAD3F8CF-D401-4EA3-8E23-913FEE83FE28'
     };
     var requestOptions = {
       headers: new Headers(header)

     };

     
     return this.http.get('https://testservices.intocareers.org/dynamicicap/v2/Site/994?stateAbbr=DEV&lang=en', requestOptions)


   }

   private _listners = new Subject<any>();

   listen(): Observable<any> {
      return this._listners.asObservable();
   }

   filter(filterBy: Object) {
      this._listners.next(filterBy);
   }

}
