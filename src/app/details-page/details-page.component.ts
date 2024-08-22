import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../country.service';
import { CommonModule } from '@angular/common';
import { ReplaceKeysPipe } from '../../replace-keys.pipe';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [CommonModule, ReplaceKeysPipe],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent {
  country?: any;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
  ){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const countryName = params.get('name');

      if(countryName) {
        this.countryService.getCountryByName(countryName).subscribe(data => {
          this.country = data;
        });
      }
    });
  }
}
