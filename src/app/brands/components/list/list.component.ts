import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands/brands.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isLoadingBrand: boolean = true;
  constructor(private _brands: BrandsService, private router: Router,private toastr: ToastrService, ) {}
  listBrands: any[] = [];
  deleteBrand(id: number): void {
      this._brands.deleteBrand(id).subscribe({
        next: () => {
          this.toastr.success('Brand deleted successfully');
          this.listBrands = this.listBrands.filter(b => b.id !== id);
        },
        error: (res) => {
          this.toastr.error('Error deleting brand');
          console.log("res",res)
        }
      });
  }
  ngOnInit(): void {
    this._brands.getAllBrands().subscribe({
      next: (res: any) => {
        console.log(this.listBrands)
        this.listBrands = res;
      },
      error: err => console.log(err),
      complete: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isLoadingBrand = false
      } 
    });
  }
}