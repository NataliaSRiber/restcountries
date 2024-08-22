import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { CountryService } from '../country.service';
import { FormControl } from '@angular/forms';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  collection: any[] = [];
  isLoading = true;
  // p: number = 1;
  // itemsPerPage: number = 10;

  input = new FormControl<string>('');
  
  constructor(
    private countryService: CountryService,
    // private searchService: SearchService,
  ) {}
  
  ngOnInit(): void {
    this.loadCountries();
    // existe para conectar com o sistema criado. Se o navbar não estivesse no app.componente nao precisaria
    // this.searchService.search$.subscribe(inputValue => {
    //   this.onSearch(inputValue);
    // });
  }
  
  loadCountries(): void {
    this.isLoading = true;
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.collection = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching countries', err);
        this.isLoading = false;
      }
    })
  }

  // onSearch(inputValue: string) {
  //   this.isLoading = true;
  //   this.countryService.getCountryByName(inputValue).subscribe({
  //     next: (data) => {
  //       this.collection = [data];
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching countries', err);
  //       this.collection = [];
  //       this.isLoading = false; // Finaliza o carregamento mesmo em erro
  //     },
  //     // error: (err) => {
  //     //   console.log(err)
  //     //   if (err.status === 404) {
  //     //     console.error('País não encontrado');
  //     //     this.collection = []; // Limpa a coleção se o país não for encontrado
  //     //   } else {
  //     //     console.error('Erro ao pesquisar o país', err);
  //     //   }
  //     //   // console.error('Error searching country', err);
  //     //   this.isLoading = false;
  //     // }
  //   });
  // }
  onSearch(inputValue: string) {
    this.isLoading = true;
    this.countryService.getCountryByName(inputValue).subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data); // Loga os dados recebidos
  
        // Verifica se os dados recebidos são um array ou um objeto
        if (Array.isArray(data)) {
          this.collection = data; // Se for um array, atribui diretamente
        } else if (data) {
          // Se for um objeto, transforma em um array
          this.collection = [data]; // Coloca o objeto em um array
        } else {
          console.warn('Nenhum dado retornado, atribuindo como array vazio');
          this.collection = []; // Se não houver dados, define como array vazio
        }
  
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching countries', err);
        this.collection = []; // Limpa a coleção em caso de erro
        this.isLoading = false; // Finaliza o carregamento mesmo em erro
      }
    });
  }
  
  
}
