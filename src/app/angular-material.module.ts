import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon'
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
      exports: [
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatTabsModule
      ]
})

export class AngularMaterialModule {

}