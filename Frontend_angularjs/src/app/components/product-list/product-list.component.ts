import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { HttpService } from '../../http.service'; 
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, CommonModule, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  router = inject(Router);
  productList: IProduct[] = [];
  httpService = inject(HttpService);
  toastr = inject(ToastrService);
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'quantity',
    'action',
  ];

  ngOnInit() {
    this.getProductsFromServer();
  }

  getProductsFromServer() { 
    this.httpService.getAllProduct().subscribe((result) => {
      this.productList = result;
      console.log(this.productList);
    });
  }

  edit(id: number) {
    this.router.navigateByUrl(`/edit-product/${id}`);
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.httpService.deleteProduct(id).subscribe(() => {
        this.getProductsFromServer();
        this.toastr.success('Product deleted successfully');
      });
    }
  }
}
