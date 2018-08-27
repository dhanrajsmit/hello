import { PagerService } from './../../_services/pager.service';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
    

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule.forRoot(),
        NgbAlertModule.forRoot(),
        DashboardRoutingModule,
        
        FormsModule,
        SharedPipesModule,

    ],
    declarations: [
        DashboardComponent],

        providers: [PagerService],
      
})
export class DashboardModule {}
