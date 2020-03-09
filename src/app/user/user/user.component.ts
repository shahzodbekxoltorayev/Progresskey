import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#menu-toggle,#menu-overlay').click(function(){
      $('.user').toggleClass('open-menu');
    });
    
    $('#main-nav li a').click(function(){
      $('#main-nav li').removeClass('active');
      $(this).parent().addClass('active')
    });
    
    $('#tabs li').click(function(){
      var clickTarget = $(this).attr('data-target');
      $('.tab-target').removeClass('targeted');
      $('#'+clickTarget).addClass("targeted");
      $('#tabs li').removeClass('active');
      $(this).addClass('active')
    });
    
    $('#admin-search input').on('focus',function(){
      $('#header_logo').addClass('hidden');
    });
    $('#admin-search input').on('blur',function(){
      $('#header_logo').removeClass('hidden');
    });
  }

}
