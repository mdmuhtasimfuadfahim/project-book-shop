import axios from 'axios';
import Noty from 'noty';

export function initAddToOrder(){
    let addToCart = document.querySelectorAll('.add-to-cart')
    let cartCounter = document.querySelector('#top2')

function updateCart(books){
  axios.post('/update-cart', books).then(res =>{
    // console.log(res)
    cartCounter.innerText = res.data.totalBooks
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'A book added to cart',
        progressBar: false
    }).show();
    }).catch(err =>{
    new Noty({
        type: 'error',
        timeout: 1000,
        text: 'Something went wrong',
        progressBar: false
    }).show();
  })
}

addToCart.forEach((btn)=>{
  if(!addToCart){
    return;
  }
  btn.addEventListener('click', (e)=>{
    let books = JSON.parse(btn.dataset.books)
    updateCart(books)
  })
})
}