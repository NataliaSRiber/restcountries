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
  @Output() search = new EventEmitter<{ input: string; continent: string; language: string }>();
  input = new FormControl<string>('');
  selectedContinent: string = '';
  selectedLanguage: string = '';

  constructor(){}

  onSearch() {
    this.search.emit({
      input: this.input.value || '',
      continent: this.selectedContinent,
      language: this.selectedLanguage
    });
  }

  onContinentChange(event: any) {
    this.selectedContinent = event.target.value;
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.target.value;
  }
}
