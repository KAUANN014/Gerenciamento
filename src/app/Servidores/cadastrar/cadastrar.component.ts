import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServidorService } from '../../service/servidor.service';

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
    private servidorService: ServidorService
  ) { }

  ngOnInit(): void {
    this.servidorForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      orgaoId: ['', Validators.required],
      lotacaoId: ['', Validators.required]
    });

    this.carregarOrgaos();
  }

  carregarOrgaos(): void {
    this.servidorService.listarOrgaos().subscribe((orgaos) => {
      this.orgaos = orgaos;
    });
  }

  filtrarLotacoes(event: any): void {
    const orgaoId = event.value; // Pega o id do órgão selecionado
    
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
        orgaoId: this.servidorForm.value.orgaoId,  // Envia o ID do órgão
        lotacaoId: this.servidorForm.value.lotacaoId,  // Envia o ID da lotação
        sala: this.servidorForm.value.sala,  // Se for obrigatório, deve ser preenchido
        status: this.servidorForm.value.status  // Se for obrigatório, deve ser preenchido
      };
  
      this.servidorService.criarServidor(servidorData).subscribe({
        next: () => {
          alert('Servidor cadastrado com sucesso!');
          this.servidorForm.reset();
        },
        error: (err) => {
          alert('Erro ao cadastrar servidor!');
          console.error('Erro:', err);
        }
      });
    }
  }
  
}
