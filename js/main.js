(function(html) {

    'use strict';

    const cfg = {

        // Countdown Timer Final Date
        finalDate : 'July 1, 2025 00:00:00',
    };


    /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


   /* animate elements if inside viewport
    * ------------------------------------------------------ */
    const ssAnimateOnScroll = function() {

        const items = document.querySelectorAll(".ss-animate");
        const animateOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const animateObserver = new IntersectionObserver(function(entries, animateObserver) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return; 
                else {
                    entry.target.classList.add("animated");
                    animateObserver.unobserve(entry.target);
                }
            });
        }, animateOptions);

        items.forEach(function(item) {
            animateObserver.observe(item);
        });
        
    }; // end ssAnimateOnScroll


   /* Countdown Timer
    * ------------------------------------------------------ */
    const ssCountdown = function () {

        const finalDate = new Date(cfg.finalDate).getTime();
        const daysSpan = document.querySelector('.counter .ss-days');
        const hoursSpan = document.querySelector('.counter .ss-hours');
        const minutesSpan = document.querySelector('.counter .ss-minutes');
        const secondsSpan = document.querySelector('.counter .ss-seconds');
        let timeInterval;

        if (!(daysSpan && hoursSpan && minutesSpan && secondsSpan)) return;

        function timer() {

            const now = new Date().getTime();
            let diff = finalDate - now;

            if (diff <= 0) {
                if (timeInterval) { 
                    clearInterval(timeInterval);
                }
                return;
            }

            let days = Math.floor( diff/(1000*60*60*24) );
            let hours = Math.floor( (diff/(1000*60*60)) % 24 );
            let minutes = Math.floor( (diff/1000/60) % 60 );
            let seconds = Math.floor( (diff/1000) % 60 );

            if (days <= 99) {
                if (days <= 9) {
                    days = '00' + days;
                } else { 
                    days = '0' + days;
                }
            }

            hours <= 9 ? hours = '0' + hours : hours;
            minutes <= 9 ? minutes = '0' + minutes : minutes;
            seconds <= 9 ? seconds = '0' + seconds : seconds;

            daysSpan.textContent = days;
            hoursSpan.textContent = hours;
            minutesSpan.textContent = minutes;
            secondsSpan.textContent = seconds;

        }

        timer();
        timeInterval = setInterval(timer, 1000);
    };



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
                const modal = document.getElementById("confirmationModal");
                modal.style.display = "block";
            }
    document.getElementById('modal-button').addEventListener('click', closeModal)
            function closeModal() {
                const modal = document.getElementById("confirmationModal");
                modal.style.display = "none";
            }
    document.getElementById('mce-EMAIL').value = '';
        });
    });
    

   



   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssAnimateOnScroll();
        ssCountdown();
   

    })();

})(document.documentElement);