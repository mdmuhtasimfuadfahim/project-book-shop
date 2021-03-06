import axios from 'axios';
import Noty from 'noty';

export function initAddToOrder(){
    let addToCart = document.querySelectorAll('.add-to-cart')
    let cartCounter = document.querySelector('#top2')

function updateCart(book){
  axios.post('/update-cart', book).then(res =>{
    // console.log(res)
    cartCounter.innerText = res.data.totalBooks
    // new Noty({
    //     type: 'error',
    //     timeout: 1000,
    //     text: 'A book added to cart',
    //     progressBar: true
    // }).show();
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
    let book = JSON.parse(btn.dataset.book)
    updateCart(book)
  })
})
}