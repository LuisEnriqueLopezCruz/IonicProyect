import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pageinitier',
  templateUrl: './pageinitier.page.html',
  styleUrls: ['./pageinitier.page.scss'],
})
export class PageinitierPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  logout() {
   
    this.router.navigate(['/login']); // Redirige al login
  }

  goToCart(){

  }
}
