import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isLoadingUser: boolean = true;
  constructor(private _users: UsersService, private router: Router,private toastr: ToastrService, ) {}
  listUsers: any[] = [];
  deleteUser(id: number): void {
      this._users.deleteUser(id).subscribe({
        next: () => {
          this.toastr.success('User deleted successfully');
          this.listUsers = this.listUsers.filter(b => b.id !== id);
        },
        error: (res) => {
          this.toastr.error('Error deleting user');
          console.log("res",res)
        }
      });
  }
  ngOnInit(): void {
    this._users.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(this.listUsers)
        this.listUsers = res.users;

      },
      error: err => console.log(err),
      complete: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.isLoadingUser = false
      } 
    });
  }
}