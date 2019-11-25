// Kristofer McCormick 1803203
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

//  { path: '', loadChildren: './login/login.module#LoginPageModule' },
//  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'cv', loadChildren: './cv/cv.module#CvPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
