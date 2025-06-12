import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrandsService } from '../../services/brands/brands.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  addBrandForm = new FormGroup({
    name: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required)
  });
  brandId: number=0;
  brandData: any;
  constructor(
    private fb: FormBuilder,
    private _brands: BrandsService,
    private toastr: ToastrService, 
    private _Router:Router,
    private _ActivatedRouter:ActivatedRoute
  ) {
    this.brandId = _ActivatedRouter.snapshot.params['id'];
  }
  getImageSrc(): string {
    const imgVal = this.addBrandForm.get('img')?.value;
    if (!imgVal) return '';
    return imgVal.startsWith('data:image') ? imgVal : `data:image/jpeg;base64,${imgVal}`;
  }
  ngOnInit(): void {
    if (this.brandId) {
      this._brands.getBrand(this.brandId).subscribe({
        next: (res: any) => {
          // Ensure it has base64 prefix if missing
          const imgValue = res.img.startsWith('data:image') ? res.img : `data:image/jpeg;base64,${res.img}`;
          this.addBrandForm.patchValue({
            name: res.name,
            img: imgValue
          });
        },
        error: () => {
          this.toastr.error('Failed to load brand data');
        }
      });
      
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fullBase64 = reader.result as string;
        this.addBrandForm.get('img')?.setValue(fullBase64);
      };
      reader.readAsDataURL(file);
    }
  }

  // getBrandData(id:number) {
  //   this._brands.getBrand(id).subscribe({
  //     next: (res: any) => {
  //       console.log('res brand:', res);
  //       this.brandData = res;
  //     },
  //     complete: () => {
  //     this.addBrandForm.patchValue({
  //       name:this.brandData.name,
  //       img:this.brandData.img
  //     })
  //     },
  //     error: (err: any) => {
  //       console.error('Error adding brand:', err);
  //       this.toastr.error('Error adding brand');
  //     }
  //   })
  // }
  onEditBrand(): void {
    if (this.addBrandForm.invalid || !this.brandId) {
      this.toastr.error('Please fill all fields correctly.');
      return;
    }
  
    const data = {
      name: this.addBrandForm.get('name')?.value ?? '',
      img: this.addBrandForm.get('img')?.value ?? ''
    };
    this._brands.editBrand(data, this.brandId).subscribe({
      next: (res: any) => {
        this.toastr.success('Brand updated successfully');
      },
      complete: () => {
        this._Router.navigate(['/brands/list']);
      },
      error: (err: any) => {
        console.error('Error editing brand:', err);
        this.toastr.error('Error updating brand');
      }
    });
  }
  onAddBrand(): void {
    if (this.addBrandForm.invalid) {
      this.toastr.error('Please fill all fields correctly.');
      return;
    }

    const data = {
      name: this.addBrandForm.get('name')?.value ?? '',
      img: this.addBrandForm.get('img')?.value ?? ''
    };
    
    this._brands.addBrand(data).subscribe({
      next: (res: any) => {
        this.toastr.success('Brand added successfully');
      },
      complete: () => {
        this._Router.navigate(['/brands/list']);
      },
      error: (err: any) => {
        console.error('Error adding brand:', err);
        this.toastr.error('Error adding brand');
      }
    });
  }
}
