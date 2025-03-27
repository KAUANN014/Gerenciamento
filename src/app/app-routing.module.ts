import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './Servidores/listar/listar.component';
import { CadastrarComponent } from './Servidores/cadastrar/cadastrar.component';

const routes: Routes = [
  { path: '', component: ListarComponent },
  { path: 'cadastrar', component: CadastrarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
