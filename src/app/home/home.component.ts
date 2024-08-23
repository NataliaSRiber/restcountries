import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { CountryService } from '../country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  input = new FormControl('');
  selectedContinent: string = '';
  selectedLanguage: string = '';
  collection: any[] = [];
  isLoading = true;
  // p: number = 1;
  // itemsPerPage: number = 10;

  constructor(private countryService: CountryService) { }
    
  ngOnInit(): void {
    this.loadCountries();
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

  onSearch(inputValue: string) {
    this.isLoading = true;
    this.countryService.getCountryByName(inputValue).subscribe({
      next: (data) => {
        this.collection = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching country by name', err);
        this.isLoading = false;
      }
    });
  }
  
  onContinentSearch(continent: string) {
    if(continent) {
      this.isLoading = true;
      this.countryService.getFilteredCountriesByRegion(continent).subscribe({
        next: (data) => {
          console.log(data)
          this.collection = Array.isArray(data) ? data : [data];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching countries by continent', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = true;
      this.loadCountries();
    }
  }
  
  onLanguageSearch(language: string) {
    if (language) {
      this.isLoading = true;
      this.countryService.getFilteredCountriesByLanguage(language).subscribe({
        next: (data) => {
          this.collection = Array.isArray(data) ? data : [data];
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching countries by language', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = true;
      this.loadCountries();
    }
  }
  
  
  
}
