import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardapiService {

  constructor(private http:Http) {

   }

   public dashBoardApiHandler(){
     var header = {
       'Authorization': 'DAD3F8CF-D401-4EA3-8E23-913FEE83FE28'
     };
     var requestOptions = {
       headers: new Headers(header)

     };

     
     return this.http.get('https://testservices.intocareers.org/dynamicicap/v2/Site/994', requestOptions)


   }
}
