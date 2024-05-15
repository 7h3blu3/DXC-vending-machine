import { NgModule } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatIconModule} from '@angular/material/icon'

@NgModule({
      exports: [
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
      ]
})

export class AngularMaterialModule {

}