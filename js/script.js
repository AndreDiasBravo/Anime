const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.popup-mobilemenu');
const menuBar = document.getElementById('bar');
const close = document.getElementById('close');

mobileMenu.addEventListener('click', (e) => {
  if (e.target.matches('.menu__item')) {
    // disable default behavior
    e.preventDefault();

    // close the side-bar menu
    closeSideMenu();

    // change the location
    window.location.href = e.target.href;
  }
});

function closeSideMenu() {
  const sideMenuToggle = document.querySelector('#close');
  sideMenuToggle.click();
}

window.onscroll = () => {
  if (document.documentElement.scrollTop > 20) {
    navbar.classList.add("scroll-on");
  } else {
    navbar.classList.remove("scroll-on");
  }
}

if (menuBar) {
  menuBar.addEventListener('click', () => {
    mobileMenu.classList.add('menu-open');
  })
}

if (close) {
  close.addEventListener('click', () => {
    mobileMenu.classList.remove('menu-open');
  })
}

// Mobile Navbar - SubMenu
const subMenu = () => {
  var mobSubMenu = document.getElementById('sub-menu');
  if (mobSubMenu.style.display === "block") {
    mobSubMenu.style.display = "none";
  } else {
    mobSubMenu.style.display = "block";
  }
}


//Contact Form
jQuery(document).ready(function () {
    contact_form();
  
    function contact_form() {
  
      "use strict";
  
      jQuery(".contact_form #send_message").on('click', function () {
  
        var name = jQuery(".contact_form #name").val();
        var email = jQuery(".contact_form #email").val();
        var message = jQuery(".contact_form #message").val();
        var subject = jQuery(".contact_form #subject").val();
        var success = jQuery(".contact_form .returnmessage").data('success');
  
        jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
        //checking for blank fields	
        if (name === '' || email === '' || message === '') {
  
          jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
        }
        else {
          // Returns successful data submission message when the entered information is stored in database.
          jQuery.post("contact.php", { ajax_name: name, ajax_email: email, ajax_message: message, ajax_subject: subject }, function (data) {
  
            jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph
  
  
            if (jQuery(".contact_form .returnmessage span.contact_error").length) {
              jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
            } else {
              jQuery(".contact_form .returnmessage").append("<span class='contact_success'>" + success + "</span>");
              jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
            }
  
            if (data === "") {
              jQuery("#contact_form")[0].reset();//To reset form fields on success
            }
  
          });
        }
        return false;
      });
    }
  });



//Slider
$('.slider').each(function() {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide_main');
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;
  
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    advance();
    
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      currentIndex = newIndex;
    });
  }
  
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 6000);
  }
  
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });
  
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move(3);
    }
  });
  
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });
  
  advance();
});