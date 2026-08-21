import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DateFormatService } from './date-format.service';
import { DateFormat } from './interfaces/date-format.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './users/models/user.model';
import { selectLoading, selectUser } from './store/app.selectors';
import * as appActions from './store/app.actions';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, AsyncPipe, MatProgressSpinnerModule, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'interview';
  today: string;

  user$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private dateFormatService: DateFormatService, private store: Store) {
    
    this.today = this.dateFormatService.today();

    this.user$ = this.store.select(selectUser);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(appActions.getUser());
  }
}
