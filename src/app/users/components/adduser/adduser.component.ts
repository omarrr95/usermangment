import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
addUserForm = new FormGroup({
  firstName: new FormControl('', Validators.required),
  email: new FormControl('', Validators.required),
  phone: new FormControl('', Validators.required),
  age: new FormControl('', Validators.required)
  });
  userId: number=0;
  userData: any;
  constructor(
    private fb: FormBuilder,
    private _users: UsersService,
    private toastr: ToastrService, 
    private _Router:Router,
    private _ActivatedRouter:ActivatedRoute
  ) {
    this.userId = _ActivatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.userId) {
      this._users.getUser(this.userId).subscribe({
        next: (res: any) => {
          this.addUserForm.patchValue({
            firstName: res.firstName,
            email: res.email,
            phone: res.phone,
            age: res.age
          });
        },
        error: () => {
          this.toastr.error('Failed to load user data');
        }
      });
    }
  }
  onEditUser(): void {
    if (this.addUserForm.invalid || !this.userId) {
      this.toastr.error('Please fill all fields correctly.');
      return;
    }
  
    const data = {
      firstName: this.addUserForm.get('firstName')?.value ?? '',
      email: this.addUserForm.get('email')?.value ?? '',
      phone: this.addUserForm.get('phone')?.value ?? '',
      age: this.addUserForm.get('age')?.value ?? 0
    };
  
    this._users.editUser(data, this.userId).subscribe({
      next: (res: any) => {
        this.toastr.success('User updated successfully');
      },
      complete: () => {
        this._Router.navigate(['/users/list']);
      },
      error: (err: any) => {
        console.error('Error editing user:', err);
        this.toastr.error('Error updating user');
      }
    });
  }
  onAddUser(): void {
    if (this.addUserForm.invalid) {
      this.toastr.error('Please fill all fields correctly.');
      return;
    }

    const data = {
      firstName: this.addUserForm.get('firstName')?.value ?? '',
      email: this.addUserForm.get('email')?.value ?? '',
      phone: this.addUserForm.get('phone')?.value ?? '',
      age: this.addUserForm.get('age')?.value ?? 0
    };
    
    this._users.addUser(data).subscribe({
      next: (res: any) => {
        this.toastr.success('User added successfully');
      },
      complete: () => {
        this._Router.navigate(['/users/list']);
      },
      error: (err: any) => {
        console.error('Error adding user:', err);
        this.toastr.error('Error adding user');
      }
    });
  }
}
