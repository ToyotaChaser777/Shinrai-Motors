let condition = true;
let start = 0;
let end = 0;
let links = document.querySelectorAll(".scroll");
let targetID; 

// links.forEach(function(element){
//     element.addEventListener("click", function(event){
//         event.preventDefault();
//         targetID = element.getAttribute("href");
//         document.querySelector(targetID).scrollIntoView({
//             behavior: "smooth",
//             block: "start"
//         })
//     });
// })

$(".scroll").on("click", function(){
    let block = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(block).offset().top
    }, {
        duration: 400,
        easing: "swing"
    });
    return false;
});

function forward(){
    anime ({
        targets: ".menu-small",
        translateX: ['-100%', '0'],
        easing: "easeInOutExpo",
        direction: "alternate",
        duration: 1000,
        loop: "false"
    })

    condition = false;
    disableScroll();
}

function backward(){
    anime ({
        targets: ".menu-small",
        translateX: ['0', '-100%'],
        easing: "easeInOutExpo",
        direction: "alternate",
        duration: 1000,
        loop: "false"
    })

    condition = true;
    enableScroll();
}

$('.menu_small_icon').click(function(){
    if(condition){
        forward();
    }
    else{
        backward();
    }
})

$('.container').on("touchstart", function(event){
    start = event.originalEvent.touches[0].pageX;
})

$('.container').on("touchend", function(event){
    end = event.originalEvent.changedTouches[0].pageX;
    if(end - start >= 100 && condition){
        forward();
    }
    else if(start-end >= 100 && !condition){
        backward();
    }
})

$('.carousel').slick({
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    prevArrow: '<img src="images/l.png">',
    nextArrow: '<img src="images/r.png">',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
});

function preventKeyScroll(event) {
    if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(event.code)) {
        event.preventDefault();
    }
}

function preventScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}

function disableScroll() {
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('keydown', preventKeyScroll);

    document.documentElement.style.overflow = "hidden"; 
    document.body.style.overflow = "hidden"; 
}

function enableScroll() {
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventScroll);
    document.removeEventListener('keydown', preventKeyScroll);

    document.documentElement.style.overflow = "auto"; 
    document.body.style.overflow = "auto";
}