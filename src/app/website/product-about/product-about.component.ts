import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-product-about',
  templateUrl: './product-about.component.html',
  styleUrls: ['./product-about.component.css']
})
export class ProductAboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var Slideshow = {

      setHeight: function() {
  
          var $img = $('img', '#products-wrapper');
          var total = 200 * $img.length;
  
          $('#products-container').height(total);
  
  
  
      },
  
      slide: function() {
  
          $('a', '#thumb-nav').on('click', function() {
  
              var $a = $(this);
              var $image = $('img', '#products-wrapper').eq($a.data('rel'));
  
              $('#products-container').animate({
                  top: -$image.position().top
              }, 500, 'easeOutBounce');
  
  
  
          });
  
      },
  
      init: function() {
          this.setHeight();
          this.slide();
      }
  
  };
  
  Slideshow.init();
  }

}
