import { trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { DashboardapiService} from '../../../shared/services/dashboardapiservice/dashboardapi.service';
import { find } from 'cfb/types';
@Component({
   selector: 'app-sidebar',
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

   @Output() collapsedEvent = new EventEmitter<boolean>();
   itemList: any[];
   allItems: any[];
   allitemsTemp: any[];
   displayNameAll : any[];
   gradesList : any[];
   gradesListAll : any[];

   displayNameList : any[];
 
   checkedItemsList:any[]=[];
   constructor(private http: Http, private translate: TranslateService, public router: Router,public dashboardApiService : DashboardapiService) {
   }

   ngOnInit() {


           this.dashboardApiService.dashBoardApiHandler().subscribe((data:any) => {
               let jsonObj:any =JSON.parse(data["_body"]);
               this.allItems = jsonObj.Result.SiteSpecificPlans[0].SitePlans;
               this.allitemsTemp = this.allItems;
           });


           this.dashboardApiService.dashBoardApiHandler().subscribe(data => {
               console.log(data);
               this.displayNameAll = data.json().Result.defaultPlanProgressReport.PlanItemsList;

              console.log("check------>"+this.displayNameAll);
           });


          this.dashboardApiService.dashBoardApiHandler().subscribe(data => {

          this.gradesListAll = data.json().Result.defaultPlanProgressReport.GradesList;

              console.log("check------>"+this.gradesListAll);
           });




       }

       SitePlans() {
        this.allItems.map((item) =>{
          var SitePlans ={
           PlanTitle: '',
           };
           SitePlans.PlanTitle=item.PlanTitle;
           this.itemList.push(SitePlans);
        })
       };

       PlanItemsList() {
            this.allItems.map((item) =>{
              var PlanItemsList ={
                  ItemID: '',
                  DisplayName: '',
               };

               PlanItemsList.ItemID=item.ItemID;
               PlanItemsList.DisplayName=item.DisplayName;
             this.displayNameAll.push(PlanItemsList);
            })
           }

           GradesList() {
               this.allItems.map((item) =>{
               this.gradesList.push(item);
               })
              };




           updateCheckedPlanItems(item,event) {
               if(event.target.checked){
                this.checkedItemsList.push(item);
               }else{
                
                  this.checkedItemsList.splice(this.checkedItemsList.findIndex((findItem)=>{
                    console.log("findItem "+JSON.stringify(findItem )+" Item "+JSON.stringify(item))
                    if(findItem.DisplayName===item.DisplayName){
                        return findItem;
                    }
                }),1);  
               }
               
            let obj={dataObj:this.checkedItemsList,isChecked:event.target.checked}
                  this.dashboardApiService.dashBoardFilterObserver.next(obj);
               
            //   console.log("hiii"+JSON.stringify(item) +"event trigered ="+JSON.stringify(event.target.checked));
           }

           updateCheckedGrades(Id,event){
            if(event.target.checked){
                this.checkedItemsList.push(Id);
               }else{
                
                  this.checkedItemsList.splice(this.checkedItemsList.findIndex((findItem)=>{
                    console.log("findItem "+JSON.stringify(findItem )+" Item "+JSON.stringify(Id))
                    if(findItem.CurrentGradeLevel===Id.CurrentGradeLevel){
                        return findItem;
                    }
                }),1);  
               }
               
            let obj={dataObj:this.checkedItemsList,isChecked:event.target.checked}
                  this.dashboardApiService.dashBoardFilterObserver.next(obj);           }





}







