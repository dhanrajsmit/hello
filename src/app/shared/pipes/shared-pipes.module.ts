import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterdataPipe } from '../../layout/filterdata.pipe';


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [FilterdataPipe],
    exports: [
        FilterdataPipe,
      ]
})
export class SharedPipesModule {


}
