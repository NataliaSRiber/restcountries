import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new Subject<string>();

    // Observable para permitir que os componentes se inscrevam no evento de pesquisa
    search$ = this.searchSubject.asObservable();
      // Função para emitir o valor da pesquisa
    search(inputValue: string) {
      this.searchSubject.next(inputValue);
  }
}