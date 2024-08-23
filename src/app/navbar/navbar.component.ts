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
  @Output() search = new EventEmitter<string>();
  @Output() continentChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();

  input = new FormControl<string>('');
  selectedContinent: string = '';
  selectedLanguage: string = '';

  constructor(){}

  onSearch() {
    if (this.selectedContinent) {
      this.continentChange.emit(this.selectedContinent);
    } else if (this.selectedLanguage) {
      this.languageChange.emit(this.selectedLanguage);
    } else if (this.input.value) {
      this.search.emit(this.input.value!);
    } else {
      this.search.emit
    }
  }

  onContinentChange(event: any) {
    this.selectedContinent = event.target.value;
    this.continentChange.emit(this.selectedContinent);
  }

  onLanguageChange(event: any) {
    this.selectedLanguage = event.target.value;
    this.languageChange.emit(this.selectedLanguage);
  }
}
