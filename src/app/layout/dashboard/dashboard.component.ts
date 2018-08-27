import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PagerService } from '../../_services';
import {DashboardapiService} from '../../shared/services/dashboardapiservice/dashboardapi.service';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    constructor(private http: Http, private pagerService: PagerService,public dashBoarApiService :DashboardapiService) { }
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

    allitemsTemp = [];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];
    itemList =[];

    ngOnInit() {
         this.pageSize = 10;
         this.dashBoarApiService.dashBoardApiHandler().subscribe(data => {
            console.log(data);
            this.allItems = data.json().Result.defaultPlanProgressReport.UserActivityItemCompletionStatusList;
           
           //console.log("check------>"+this.allItems)
           
            this.allitemsTemp = this.allItems;
            this.setPage(1);
        });
    
         
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

            this.setPage(1);
          }
          catch (e) {
              alert('searchString  ex ception ' + e.message);
          }
      }
     

}
