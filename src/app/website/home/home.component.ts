import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function() {

      $('#testimonial-slider').owlCarousel({
        loop: true,
        margin: 10,
            pagination: true,
          navigation:  false,
        responsiveClass: true,
        autoPlay: true,
        responsive: {
            0: {
                items: 1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop:false
            }
        }
    })
  });

  // makes the parallax elements
function parallaxIt() {
  // create variables
  var $fwindow = $(window);
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  var $contents = [];
  var $backgrounds = [];

  // for each of content parallax element
  $('[data-type="content"]').each(function(index, e) {
    var $contentObj = $(this);

    $contentObj.__speed = ($contentObj.data('speed') || 1);
    $contentObj.__fgOffset = $contentObj.offset().top;
    $contents.push($contentObj);
  });

  // for each of background parallax element
  $('[data-type="background"]').each(function() {
    var $backgroundObj = $(this);

    $backgroundObj.__speed = ($backgroundObj.data('speed') || 1);
    $backgroundObj.__fgOffset = $backgroundObj.offset().top;
    $backgrounds.push($backgroundObj);
  });

  // update positions
  $fwindow.on('scroll resize', function() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    $contents.forEach(function($contentObj) {
      var yPos = $contentObj.__fgOffset - scrollTop / $contentObj.__speed;

      $contentObj.css('buttom', yPos);
    })

    $backgrounds.forEach(function($backgroundObj) {
      var yPos = -((scrollTop - $backgroundObj.__fgOffset) / $backgroundObj.__speed);

      $backgroundObj.css({
        backgroundPosition: '50% ' + yPos + 'px'
      });
    });
  });

  // triggers winodw scroll for refresh
  $fwindow.trigger('scroll');
};

parallaxIt();



$('#header-slider').owlCarousel({
  items: 1,
  center: true,
  loop: true,
  nav: false,
  dots: true,
  autoplay: true,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn'
  });
  var owl = $('.owl-carousel');
  owl.owlCarousel();
  // owl.on('translate.owl.carousel', function (event) {
  // $('.owl-carousel h1').removeClass('animated').hide();
  // $('.owl-carousel p').removeClass('animated').hide();
  // $('.owl-carousel .boxed-btn').removeClass('animated').hide();
  // })

  // owl.on('translated.owl.carousel', function (event) {
  //     $('.owl-carousel h1').addClass('animated fadeInUp').show();
  //     $('.owl-carousel p').addClass('animated fadeInDown').show();
  //     $('.owl-carousel .boxed-btn').addClass('animated fadeInDown').show();
  // })

  }
  send(name, phone, text) {
    console.log(name, phone, text);
  }


}
