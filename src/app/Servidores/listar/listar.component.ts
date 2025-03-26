import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServidorService } from '../../service/servidor.service';

@Component({
  selector: 'app-listar',
  standalone: false,
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss'],
})
export class ListarComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'orgao', 'lotacao', 'acoes'];
  dataSource = new MatTableDataSource<any>();

  constructor(private servidorService: ServidorService) {}

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

  confirmarExclusao(id: number): void {
    // Confirmar exclusão e então fazer a requisição de exclusão
    console.log('Excluir Servidor', id);
  }

  criarNovoServidor(): void {
    // Redirecionar ou abrir modal para criar um novo servidor
    console.log('Criar Novo Servidor');
  }
}
