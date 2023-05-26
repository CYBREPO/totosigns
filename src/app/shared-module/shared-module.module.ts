import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MaterialModuleModule } from './material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';



@NgModule({
  declarations: [SideNavComponent,BreadcrumbComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    ReactiveFormsModule
  ],
  exports: [SideNavComponent,ReactiveFormsModule]
})
export class SharedModuleModule { }
