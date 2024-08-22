import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = 'https://restcountries.com/v3.1';
  constructor( private http: HttpClient) { }

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      // função de comparação de strings para determinar a ordem de duas strings
      map((countries: any[]) => countries.sort((a, b) => a.name.official.localeCompare(b.name.official))
      )
    );
  }

  getCountryByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/name/${name}`).pipe(map(data => data[0] ))
  }
  
  getFilteredCountriesByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/region/${region}`).pipe(map(data => data[0] ))
  }

  getFilteredCountriesByLanguage(language: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/translation/${language}`).pipe(map(data => data[0] ))
  }
}