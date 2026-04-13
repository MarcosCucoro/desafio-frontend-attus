import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

import { UserListComponent } from '../../../features/users/pages/user-list/user-list.component';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-header',
  imports: [UserListComponent, MatIconModule, MatToolbarModule, ToggleThemeComponent, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  private userService = inject(UserService);
  searchControl = new FormControl('', { nonNullable: true});

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((value) => {
        this.onSearch(value);
      })
  }

  onSearch(value: string) {
    this.userService.setSearch(value);
  }

}
