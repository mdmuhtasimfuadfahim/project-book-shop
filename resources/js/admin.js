import axios from 'axios';
import moment from 'moment';
import Noty from 'noty';
// import order from '../../app/models/order';

export function initAdmin(socket){
    const ordertableBody = document.querySelector('#orderTableBody')

    let orders = []
    let markup

    axios.get('/admin/customer-orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        orders = res.data
        markup = generateMarkup(orders)
        ordertableBody.innerHTML = markup
    }).catch(err =>{
        console.log(err)
    })

    function renderMenus(books){
        let parsedMenus = Object.values(books)
        return parsedMenus.map((bookItem) =>{
            return `
              <p>${ bookItem.books.bookName } - ${ bookItem.bookqty }  </p>
            `
        }).join('')
    }

    function generateMarkup(orders){
        /*------------generating table body---------*/ 
        return orders.map(order => {
            return `
            <tr>
            <td>
                <a href=""><p class="order-id">${ order._id }</p></a>
                <div class="order-info"><p>${ renderMenus(order.books)  }</p></div>
            </td>
            <td>${ order.customerId.name }</td>
            <td>${ order.customerId.email }</td>
            <td>${ order.contact }</td>
            <td>
            <div class="inline-block relative w-64 text-left">
                        <form action="/admin/order/status" method="POST">
                            <input type="hidden" name="orderId" value="${ order._id }">
                            <select name="status" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="order_placed"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-left px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
            </td>
            <td>${ moment(order.createdAt).format('DD/MM/YYYY') }</td>
            <td>${ moment(order.createdAt).format('hh:mmA') }</td>
        </tr>
        `
        }).join('')
    }

    /*-------socket--------*/
    socket.on('orderPlaced', (order) => {
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'New order comes',
            progressBar: false,
        }).show();
        orders.unshift(order)
        orderTableBody.innerHTML = ''
        orderTableBody.innerHTML = generateMarkup(orders)
    })
}