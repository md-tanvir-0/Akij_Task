import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpService } from '../../http.service'; 
import { IProduct } from '../../interfaces/product'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(1)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  productId!: number;
  isEdit = false;

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.isEdit = true;
      this.httpService.getProduct(this.productId).subscribe((result) => {
        this.productForm.patchValue(result);
      });
    }
  }

  save() {
    const product: IProduct = {
      name: this.productForm.value.name!,
      description: this.productForm.value.description!,
      price: this.productForm.value.price!,
      quantity: this.productForm.value.quantity!,
    };
  
    if (this.isEdit) {
      this.httpService.updateProduct(this.productId, product).subscribe({
        next: () => {
          this.toaster.success('Product updated successfully');
          this.router.navigateByUrl('/product-list');
        },
        error: (err) => {
          this.toaster.error('Error updating product: ' + err.message);
        }
      });
    } else {
      this.httpService.createProduct(product).subscribe({
        next: () => {
          this.toaster.success('Product added successfully');
          this.router.navigateByUrl('/product-list');
        },
        error: (err) => {
          this.toaster.error('Error adding product: ' + err.message);
        }
      });
    }
  }
}
