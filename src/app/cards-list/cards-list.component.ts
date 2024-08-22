import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [ NgxPaginationModule],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.css'
})
export class CardsListComponent {
  @Input() collection: any[] = [];
  @Input() isLoading = true;
  // @Input() p: number = 1;
  // @Input() itemsPerPage: number = 10;
  // @Output() pageChange = new EventEmitter<number>();

    // Método para emitir a mudança de página
    // onPageChange(p: number):void {
    //   this.pageChange.emit(p)
    // }
    // paginationConfig: PaginationInstance = {
    //   itemsPerPage: this.itemsPerPage,
    //   currentPage: this.p
    // };
  constructor(private router: Router) {}

  goToDetailsPage(countryName: string) {
    window.open(`/country/${countryName}`, '_blank');
  }
}
