import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServidorService } from '../../service/servidor.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ExcluirComponent } from '../excluir/excluir.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'orgao', 'lotacao', 'acoes'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private servidorService: ServidorService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarServidores();
  }

  listarServidores(): void {
    this.servidorService.listarServidores().subscribe(
      (servidores) => {
        this.dataSource.data = servidores;
      },
      (error) => {
        console.error('Erro ao buscar servidores:', error);
      }
    );
  }

  aplicarFiltro(event: Event): void {
    const filtroValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtroValue.trim().toLowerCase();
  }

  visualizar(id: number): void {}

  editarServidor(id: number): void {
    console.log('Editar Servidor', id);
  }

  editar() {
    this.router.navigate(['editar']);
  }

  confirmarExclusao(id: number) {
    const dialogRef = this.dialog.open(ExcluirComponent, {
      data: { servidorId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(`ID a ser excluído: ${id}`);
        this.excluirServidor(id);
      }
    });
  }

  excluirServidor(id: number) {
    this.servidorService.excluirServidor(id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (servidor) => servidor.id !== id
        );
      },
      error: (err) => {
        console.error('Erro ao excluir servidor', err);
      },
    });
  }

  criarNovoServidor(): void {
    this.router.navigate(['/cadastrar']);
    console.log('Criar Novo Servidor');
  }
}
