import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PagerService } from '../../_services';
import {DashboardapiService} from '../../shared/services/dashboardapiservice/dashboardapi.service';
import {ExcelService} from '../../../app/shared/services/ExcelService/excel.service';
@Component({
   moduleId: module.id,
   selector: 'app-root',
   styleUrls: ['./dashboard.component.scss'],
   templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  planTitle;
  public percentage : any; 
   constructor(private http: Http, private pagerService: PagerService,public dashBoarApiService :DashboardapiService,private excelService:ExcelService) { 

    this.dashBoarApiService.listen().subscribe((m:any) => {
      console.log(m);
      this.onFilterClick(m);
  })
   }
    
   queryString: any;
   pageSize: number;
   currentPage: number;
   limitOptions = [
       {
         key: '5',
         value: 5
       },
       {
         key: '10',
         value: 10
       },
       {
         key: '20',
         value: 20
       }
     ];

   // array of all items to be paged
   allItems: any[];
   allPlans: any[];

   allitemsTemp = [];
   allPlansTemp =[];
   allitemsPDF = [];
   Pdfdata = [];

   // pager object
   pager: any = {};

   // paged items
   pagedItems: any[];
   itemList =[];

   ngOnInit() {
        this.pageSize = 10;
        this.dashBoarApiService.dashBoardApiHandler().subscribe(data => {
           // console.log(data);
           this.allItems = data.json().Result.defaultPlanProgressReport.UserActivityItemCompletionStatusList;

          //console.log("check------>"+this.allItems)

           this.allitemsTemp = this.allItems;
           this.allitemsPDF = this.allItems;

           this.calculatePercentage();
           this.setPage(1);
       });


       this.dashBoarApiService.dashBoardApiHandler().subscribe(data => {
        // console.log(data);
        this.allPlans = data.json().Result.SiteSpecificPlans[0].SitePlans;

        this.allPlansTemp = this.allPlans;

       });

       let allitemsTemp1=[];
       this.dashBoarApiService.dashBoardFilterObservable.subscribe((resultObj:any)=>{
          // alert("DashboardComponent resultObj = "+JSON.stringify(resultObj));

          let planItemsArr:any[]= resultObj.dataObj;
          this.allitemsTemp=[];
          planItemsArr.forEach(planItem=>{
            this.allItems.forEach(item=>{
              if(item.DisplayName === planItem.DisplayName){
              this.allitemsTemp.push(item);     
              }
            })
          })
         if(this.allitemsTemp.length>0){
        //  setTimeout(()=>{
          this.allitemsPDF = this.allitemsTemp;
         }
         else{
          if(!resultObj.isChecked)
           this.allitemsTemp=this.allItems;
         }
         allitemsTemp1 = this.allitemsTemp;
          // alert("filter allItempItems "+JSON.stringify(this.allitemsTemp.length));
          this.setPage(1);
        //  },10);
       });

       this.dashBoarApiService.dashBoardFilterGradeObservable.subscribe((resultObj2:any)=>{
        let gradesArr:any[]= resultObj2.dataObj1;

     
        this.allitemsTemp=[];

        gradesArr.forEach(grade=>{
          // alert("DashboardComponent this.allItems = "+JSON.stringify(this.allItems  ));

          allitemsTemp1.forEach(item=>{
            // alert("DashboardComponent item= "+item.CurrentGradeLevel+" grade "+grade);
            // alert("DashboardComponent item= "+item.CurrentGradeLevel+" grade "+grade);
            if(item.CurrentGradeLevel+"" === grade+""){
                          

            this.allitemsTemp.push(item);     
            }
          })
        }) 
        // alert("gradesFilter allItemTemp = "+JSON.stringify(this.allitemsTemp))
       if(this.allitemsTemp.length>0){
      //  setTimeout(()=>{
        this.allitemsPDF = this.allitemsTemp;
       }
       else{
         if(!resultObj2.isChecked)
         this.allitemsTemp=allitemsTemp1;
       }
        // alert("filter allItempItems "+JSON.stringify(this.allitemsTemp.length));
        this.setPage(1);
      //  },10);
     });
 
   }

   calculatePercentage()
   {
     var sum = 0;
     var count = 0;
     this.allItems.forEach(element => {
       sum = sum + element.ActivityCompleted;
       count = count+1;
     });
     this.percentage = Math.round(sum*100/count);
   }

   filterPercentageBasedOnCategory(category){
     var sum = 0;
     var count = 0;
     this.allItems.forEach(element => {
       if(element.DisplayName == category){
        sum = sum + element.ActivityCompleted;
        count = count+1;
       }
     });
     this.percentage = Math.round(sum*100/count);
   }
   
   defaultPlanProgressReport() {

    // console.log(this.allItems);
     this.allItems.map((item) =>{
       var UserActivityItemCompletionStatusList ={
           ActivityCompleted: '',
           DisplayName: '',
           CurrentGradeLevel: '',
           FirstName: '',
           MiddleName: '',
           LastName: '',

       };
       UserActivityItemCompletionStatusList.ActivityCompleted=item.ActivityCompleted;
       UserActivityItemCompletionStatusList.DisplayName=item.DisplayName;
       UserActivityItemCompletionStatusList.CurrentGradeLevel=item.CurrentGradeLevel;
       UserActivityItemCompletionStatusList.FirstName=item.FirstName;
       UserActivityItemCompletionStatusList.MiddleName=item.MiddleName;
       UserActivityItemCompletionStatusList.LastName=item.LastName;

       this.itemList.push(UserActivityItemCompletionStatusList);
       // console.log(this.itemList);
     })

};


setPage(page: number) {
    this.pageSize = 10;

    this.currentPage = page;
   // alert(this.currentPage);

    // get pager object from service
    this.pager = this.pagerService.getPager(this.allitemsTemp.length, page);
   // alert("start "+this.pager.startIndex + "end Index" +this.pager.endIndex);


    // get current page of items
    this.pagedItems = this.allitemsTemp.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

onPageSizeChanged(event) {
    this.pageSize = event;
    this.pagerService.setPageLimit(event);

    this.setPage(1);

  }

  searchString() {
      // tslint:disable-next-line:prefer-const
      let queryStringVar = this.queryString;
      try {
   this.allitemsTemp = this.allItems.filter((item) => {
    // tslint:disable-next-line:prefer-const
    let studentName:string= item.FirstName+item.MiddleName+item.LastName;
    console.log("searchString item = "+studentName+" queryStringVar = "+queryStringVar);

      if (studentName.toLowerCase().includes(queryStringVar.toLowerCase())) {
        console.log('searchString1 filter title includes = ' + studentName.includes(queryStringVar));

          return item;
      }

   });
  console.log('searchString1 alltempitemslength= ' + this.allitemsTemp.length);


  this.allitemsPDF = this.allitemsTemp;

        this.setPage(1);
      }
      catch (e) {
          alert('searchString  ex ception ' + e.message);
      }
  }


  exportAsXLSX():void {
    alert("check")

    var allitemsPDFList ={
      name:'',
      CurrentGradeLevel: '',
      DisplayName:'',
      ActivityCompleted:'',
   };


    // for (let index = 0; index < this.allitemsPDF.length; index++) {

    //   allitemsPDFList.name = this.allitemsPDF.name



    // }

// this.Pdfdata.push(allitemsPDFList);


console.log("this.allitemsPDF------>"+this.allitemsPDF.length);
console.log("this.allitemsPDF------>"+JSON.stringify(this.allitemsPDF));



    this.excelService.exportAsExcelFile(this.allitemsPDF, 'sample');
  }

  exportAsPDF(){

  }

  


  onFilterClick(itemObj) {
    this.planTitle=itemObj.PlanTitle;
    // alert("onFilterClick = "+JSON.stringify(itemObj));
    console.log('Fire onFilterClick: ', event);
}




}