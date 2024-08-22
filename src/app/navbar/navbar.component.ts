import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>(); // evento para emitir pesquisa o componente pai
  input = new FormControl<string>('');
  searchService: any;

  constructor(){}

    // onSearch() {;
    //   const inputValue = this.input.value;
    //     if(inputValue) {
    //       this.searchService.search(inputValue);
    //   }
    // }
  // modo transmitindo diretamente para o pai e com o navbar somente na home  e nao no app.component
  onSearch() {;
    const inputValue = this.input.value;
      if(inputValue) {
      this.search.emit(inputValue);
    }
  }
}

// Para deixar a navbar no appcomponent as logicas evem ficar la, so que nao, obg
