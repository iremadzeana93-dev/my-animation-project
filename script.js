let cart = [];
const SERVICE_FEE = 0.10;
const TAX_RATE = 0.18;

function addToOrder(name, price) {
    const item = cart.find(i => i.name === name);
    if (item) {
        item.count++;
    } else {
        cart.push({ name: name, price: price, count: 1 });
    }
    renderCart();
}

function changeQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.count += delta;
    if (item.count <= 0) {
        cart = cart.filter(i => i.name !== name);
    }
    renderCart();
}

function deleteItem(name) {
    cart = cart.filter(i => i.name !== name);
    renderCart();
}

function clearAllOrders() {
    if (cart.length === 0) return;
    if (confirm("ნამდვილად გსურთ შეკვეთის გაუქმება?")) {
        cart = [];
        renderCart();
    }
}

function checkoutOrder() {
    if (cart.length === 0) {
        alert("მენიუდან ჯერ დაამატეთ კერძი!");
        return;
    }
    const total = document.getElementById('grandTotalVal').innerText;
    alert("✅ შეკვეთა მიღებულია!\nსულ გადასახდელი: " + total);
    cart = [];
    renderCart();
}

function renderCart() {
    const orderList = document.getElementById('orderList');
    const subtotalVal = document.getElementById('subtotalVal');
    const serviceFeeVal = document.getElementById('serviceFeeVal');
    const taxVal = document.getElementById('taxVal');
    const grandTotalVal = document.getElementById('grandTotalVal');

    if (cart.length === 0) {
        orderList.innerHTML = '<p class="empty-msg">შეკვეთა ცარიელია</p>';
        subtotalVal.innerText = "0.00 ₾";
        serviceFeeVal.innerText = "0.00 ₾";
        taxVal.innerText = "0.00 ₾";
        grandTotalVal.innerText = "0.00 ₾";
        return;
    }

    orderList.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemSum = item.price * item.count;
        subtotal += itemSum;

        const row = document.createElement('div');
        row.className = 'order-item';
        
        row.innerHTML = `
            <div class="item-left">
                <span class="item-name">${item.name}</span>
                <span class="item-calc">${item.price.toFixed(2)} ₾ × ${item.count} = ${itemSum.toFixed(2)} ₾</span>
            </div>
            <div class="item-controls">
                <button class="qty-btn" onclick="changeQty('${item.name}', -1)">-</button>
                <span style="font-weight: bold; min-width: 15px; text-align: center;">${item.count}</span>
                <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
                <button class="remove-btn" onclick="deleteItem('${item.name}')">✕</button>
            </div>
        `;
        
        orderList.appendChild(row);
    });

    const serviceFee = subtotal * SERVICE_FEE;
    const tax = subtotal * TAX_RATE;
    const grandTotal = subtotal + serviceFee + tax;

    subtotalVal.innerText = subtotal.toFixed(2) + " ₾";
    serviceFeeVal.innerText = serviceFee.toFixed(2) + " ₾";
    taxVal.innerText = tax.toFixed(2) + " ₾";
    grandTotalVal.innerText = grandTotal.toFixed(2) + " ₾";
}