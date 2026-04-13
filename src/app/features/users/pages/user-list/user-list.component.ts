import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserData } from '../../../../core/models/userData';
import { UserService } from '../../../../core/services/user.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserModalComponent } from '../../../../shared/components/user-modal/user-modal.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {
  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);
  users = signal<any[]>([]);
  allUsers = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  pageSize = signal(5);
  pageIndex = signal(0);
  totalUser = signal(0);
  paginatedUsers = signal<any[]>([])

  constructor() {
    effect(() => {
      this.userService.refresh$();
      this.getUsersAll();
    });
    effect(() => {
      const search = this.userService.search$();
      this.filterUsers(search);
      this.pageIndex.set(0);
      this.updatePagination();
    });

  }

  private updatePagination() {
    const all = this.users();

    this.totalUser.set(all.length);

    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize ();

    this.paginatedUsers.set(all.slice(start, end));
  }

  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
    this.updatePagination();
  }

  private getUsersAll() {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.allUsers.set(data);
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar usuários.');
        this.loading.set(false);
      }
    })
  }

  private filterUsers(search: string) {
    if (!search) {
      this.users.set(this.allUsers());
      return;
    }

    const filtered = this.allUsers().filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );

    this.users.set(filtered);
  }

  showModalEdit(user: UserData) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '800px',
      autoFocus: false,
      panelClass: 'custom-modal-container',
      data: { user }
    });

  }

  confirmDelete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      autoFocus: false,
      panelClass: 'custom-modal-container'
    })

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(id).subscribe(() => {
          this.userService.notifyRefresh();
        })
      }
    })
  }
}
