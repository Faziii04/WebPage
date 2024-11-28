const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
let allProducts = [];
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(
            product => product.title === infoProduct.title
        );

        if (exits) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );

        showHTML();
    }
});

const btnPagar = document.querySelector('#btn-pagar');



const showHTML = () => {
    // Limpiar el contenido anterior
    rowProduct.innerHTML = '';

    if (allProducts.length === 0) {
        // Si no hay productos
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
        btnPagar.classList.add('hidden');
        
        // Ocultar la información del producto y el total
        const infoCartProducts = document.querySelectorAll('.info-cart-product');
        infoCartProducts.forEach(info => {
            info.classList.add('hidden');
        });
        
        countProducts.innerText = "0";
        valorTotal.innerText = "$0";
        return; // Salimos de la función aquí si no hay productos
    }

    // Si hay productos
    cartEmpty.classList.add('hidden');
    rowProduct.classList.remove('hidden');
    cartTotal.classList.remove('hidden');
    btnPagar.classList.remove('hidden');

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <div class="cantidad-control">
                    <button class="btn-decrease">-</button>
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <button class="btn-increase">+</button>
                </div>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            `;

        rowProduct.append(containerProduct);

        total = total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};

// Llamar a showHTML cuando se carga la página
btnPagar.addEventListener('click', () => {
    if (allProducts.length > 0) {
        const total = valorTotal.innerText;
        
        // Mostrar alerta personalizada
        const customAlert = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
        const alertClose = document.getElementById('alert-close');
        const alertCancel = document.getElementById('alert-cancel');
        
        alertMessage.textContent = `Pago procesado correctamente. Total: ${total}`;
        customAlert.classList.remove('hidden');
        
        // Cerrar alerta y procesar pago al hacer click en Aceptar
        alertClose.onclick = () => {
            customAlert.classList.add('hidden');
            // Limpiar el carrito después del pago
            allProducts = [];
            showHTML();
        };

        // Cerrar alerta sin procesar pago al hacer click en Cancelar
        alertCancel.onclick = () => {
            customAlert.classList.add('hidden');
            // No se limpia el carrito, se mantiene como está
        };
    }
});

// Evento para aumentar y disminuir cantidad
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('btn-increase') || e.target.classList.contains('btn-decrease')) {
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.titulo-producto-carrito').textContent;
        
        allProducts = allProducts.map(product => {
            if (product.title === title) {
                if (e.target.classList.contains('btn-increase')) {
                    product.quantity++;
                } else if (e.target.classList.contains('btn-decrease')) {
                    if (product.quantity > 1) {
                        product.quantity--;
                    }
                }
            }
            return product;
        });

        showHTML();
    }
});