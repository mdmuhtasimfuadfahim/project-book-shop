import { initAddToOrder } from './addToCart';
import { initStripe } from './stripe';
import { initAdmin } from './admin';
import { deleteUser } from './deleteUser';


/*---------add to cart operation file--------*/ 
initAddToOrder()

/*---------socket operation (real time)--------*/ 
let socket = io()

let adminAreaPath = window.location.pathname

if(adminAreaPath.includes('admin')){
  /*----------call admin.js file-------------*/
  initAdmin(socket) 
  socket.emit('join', 'adminRoom')
}


/*---------order place information----------*/
initStripe()

/*----------remove order success alert---------*/
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
  setTimeout( () =>{
    alertMsg.remove()
  }, 2000)
}

/*--------delete user file------------*/
deleteUser() 

var searchForm = document.querySelector('.search-form');

if(searchForm){
  document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
  }
  
}

// let loginForm = document.querySelector('.login-form-container');

// document.querySelector('#login-btn').onclick = () =>{
//   loginForm.classList.toggle('active');
// }

// document.querySelector('#close-login-btn').onclick = () =>{
//   loginForm.classList.remove('active');
// }

window.onscroll = () =>{

  searchForm.classList.remove('active');

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

  fadeOut();

}

function loader(){
  document.querySelector('.loader-container').classList.add('active');
}

function fadeOut(){
  setTimeout(loader, 2000);
}

var swiper = new Swiper(".books-slider", {
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});




var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor:true,
  loop:true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});



var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
if(btn){
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
}
// When the user clicks on <span> (x), close the modal
if(span){
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}









// document.querySelector("#btn1").addEventListener("click",function myfunction(){

//   alert("Added on the cart");
// });

// document.querySelector("#btn2").addEventListener("click",function myfunction(){

//   alert("Added on the cart");
// });

// document.querySelector("#btn3").addEventListener("click",function myfunction(){

//   alert("Added on the cart");
// });

// document.querySelector("#btn4").addEventListener("click",function myfunction(){

//   alert("Added on the cart");
// });


