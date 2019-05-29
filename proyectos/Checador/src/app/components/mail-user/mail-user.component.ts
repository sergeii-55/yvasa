import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mail-user',
  templateUrl: './mail-user.component.html',
  styleUrls: ['./mail-user.component.css']
})
export class MailUserComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
   
  ) { }

  ngOnInit() {
  }

}
