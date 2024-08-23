import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CardsListComponent } from '../cards-list/cards-list.component';
import { CountryService } from '../country.service';

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

  constructor(
    private countryService: CountryService,
  ) {}

  ngOnInit(): void {
    this.loadAllCountries();
  }
  
  loadAllCountries(): void {
    this.isLoading = true;
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.collection = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading countries', err);
        this.isLoading = false;
      }
    });
  }

  onSearch(filters: { input: string; continent: string; language: string }) {
    this.isLoading = true;
    let searchObservable;

    if (filters.input) {
      searchObservable = this.countryService.getCountryByName(filters.input);
    } else if (filters.continent) {
      searchObservable = this.countryService.getFilteredCountriesByRegion(filters.continent);
    } else if (filters.language) {
      searchObservable = this.countryService.getFilteredCountriesByLanguage(filters.language);
    } else {
      this.loadAllCountries();
      return;
    }

    searchObservable.subscribe({
      next: (data) => {
        this.collection = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching countries', err);
        this.collection = [];
        this.isLoading = false;
      }
    });
  }
}
