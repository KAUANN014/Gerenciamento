import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServidorService } from '../../service/servidor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
  standalone: false
})
export class CadastrarComponent implements OnInit {
  servidorForm!: FormGroup;
  orgaos: any[] = [];
  lotacoes: any[] = [];
  lotacoesFiltradas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private servidorService: ServidorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.servidorForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.email]],
      orgaoId: ['', Validators.required],
      lotacaoId: ['', Validators.required],
      sala: [''],
      status: ['']

    });

    this.carregarOrgaos();
  }

  carregarOrgaos(): void {
    this.servidorService.listarOrgaos().subscribe((orgaos) => {
      this.orgaos = orgaos;
    });
  }

  filtrarLotacoes(event: any): void {
    const orgaoId = event.value;
    this.servidorService.listarLotacoesPorOrgao(orgaoId).subscribe(lotacoes => {
      this.lotacoesFiltradas = lotacoes;
    });
  }

  cadastrarServidor(): void {
    if (this.servidorForm.valid) {
      const servidorData = {
        nome: this.servidorForm.value.nome,
        telefone: this.servidorForm.value.telefone,
        email: this.servidorForm.value.email,
        orgaoId: Number(this.servidorForm.value.orgaoId),
        lotacaoId: Number(this.servidorForm.value.lotacaoId),
        sala: this.servidorForm.value.sala,
        status: this.servidorForm.value.status
      };

      this.servidorService.criarServidor(servidorData).subscribe({
        next: () => {

          this.servidorForm.reset();
          this.openSnackBar('Servidor cadastrado com sucesso!', 'Fechar', 'success');
        },
        error: (err) => {
          console.error('Erro ao cadastrar servidor:', err);
          this.openSnackBar('Erro ao cadastrar servidor', 'Fechar', 'error');
        }

      });
    }
  }
  openSnackBar(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: type === 'error' ? ['snackbar-error'] : ['snackbar-success'],
    });
  }


}
