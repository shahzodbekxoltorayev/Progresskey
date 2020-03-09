import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $('.nav-link').on('click', function() {
      $('.active-link').removeClass('active-link');
      $(this).addClass('active-link');
    });
  }

}
