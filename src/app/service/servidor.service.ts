import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ServidorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarServidores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}servidores`);
  }

  buscarServidorPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  excluirServidor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  criarServidor(servidor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, servidor);
  }
}
