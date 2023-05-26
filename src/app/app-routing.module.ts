import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./page-layout/page-layout.module').then(m => m.PageLayoutModule)}, 
  { path: 'build', loadChildren: () => import('./components/components-module.module').then(m => m.ComponentsModuleModule)}, 
  { path: '**', redirectTo: 'home/landing-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
