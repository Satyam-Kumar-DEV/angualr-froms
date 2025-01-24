import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: any[] = [];
  currentPage = 1;
  totalPages = 0;
  totalUsers = 0;
  limit = 50;
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'mobile',
    'addresses',
    'action',
  ];
  dataSource = new MatTableDataSource<any>();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.limit).subscribe(
      (data) => {
        this.dataSource.data = data.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  gotoAddUser(): void {
    this.router.navigate(['/add']);
  }

  editUser(id: any): void {
    this.router.navigate(['/update', id]);
  }
}
