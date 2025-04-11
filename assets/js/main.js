/*
Template Name: Appvilla - Creative Landing Page HTML Template.
Author: GrayGrids
*/

(function () {
    //===== Prealoder

    window.onload = function () {
        window.setTimeout(fadeout, 500);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }


    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        var logo = document.querySelector('.navbar-brand img')
        if (window.pageYOffset > sticky) {
          header_navbar.classList.add("sticky");
          logo.src = './assets/images/logo/stamp_d_logo_3.png';
        } else {
          header_navbar.classList.remove("sticky");
          logo.src = './assets/images/logo/stamp_d_logo (2).png';
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };


    
    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    
    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
      elem.addEventListener('click', e => {
        const href = elem.getAttribute('href');
    
        // Only smooth scroll if href starts with "#" (same-page section)
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
        
      });
    });

    // WOW active
    new WOW().init();

    //===== mobile-menu-btn
    let navbarToggler = document.querySelector(".mobile-menu-btn");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    });


})();

//Launch date
const launchDate = new Date("2025-07-01T00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;
  
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
  
    //stop timer when complete
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      // might show a message to display when timer is up
    }
  }
  
 
  const timer = setInterval(updateCountdown, 1000);
  updateCountdown(); 


   /* EmailJS
    * ---------------------------------------------------- */ 

   document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mc-form').addEventListener('submit', function(e) {
        e.preventDefault();

        let params = {
            contact_email: document.getElementById("mce-EMAIL").value
        };

        emailjs.send('service_cxza28b', 'template_g6rgrm2', params)
            .then(function(response){
                openModal();
            })
            .catch(function(error){
                alert('Failed to send email. Please try again.');
            });

            function openModal() {
                const modal = new bootstrap.Modal(document.getElementById("confirmationModal"));
                modal.show();
              }
              
document.getElementById('modal-button').addEventListener('click', closeModal)
        function closeModal() {
            const modal = document.getElementById("confirmationModal");
            modal.style.display = "none";
        }
document.getElementById('mce-EMAIL').value = '';
    });
});