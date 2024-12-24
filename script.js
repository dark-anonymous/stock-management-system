// Navigasi antar halaman
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}

// Fungsi untuk menyimpan data ke Local Storage
function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Fungsi untuk mengambil data dari Local Storage
function getDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Fungsi untuk memperbarui tabel Stock Items
function updateStockTableFromLocalStorage() {
    const stockData = getDataFromLocalStorage('stockData');
    const tableBody = document.querySelector('#stock-table tbody');
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum diperbarui

    stockData.forEach(item => {
        const row = document.createElement('tr');
        const colourColumns = Object.keys(item.quantities).map(color => {
            const value = item.quantities[color] || 0;
            const cell = document.createElement('td');
            cell.textContent = value;
            if (value > 0) {
                cell.classList.add('green'); // Tambahkan warna hijau jika stok > 0
            }
            return cell.outerHTML;
        }).join('');

        row.innerHTML = `<td>${item.type}</td><td>${item.model}</td>${colourColumns}`;
        tableBody.appendChild(row);
    });
}

// Fungsi untuk menambah atau memperbarui stok
function addToStockTable(model, type, quantities, isSelling = false) {
    let stockData = getDataFromLocalStorage('stockData');
    let item = stockData.find(i => i.type === type && i.model === model);

    if (!item) {
        // Jika item tidak ditemukan, tambahkan item baru
        item = { type, model, quantities: { ...quantities } };
        stockData.push(item);
    } else {
        // Jika item ditemukan, perbarui jumlah stok
        Object.keys(quantities).forEach(color => {
            const currentStock = item.quantities[color] || 0;
            const adjustment = quantities[color];
            item.quantities[color] = Math.max(currentStock + adjustment, 0); // Pastikan stok tidak negatif
        });
    }

    saveDataToLocalStorage('stockData', stockData);
    updateStockTableFromLocalStorage(); // Perbarui tampilan tabel
}

// Fungsi untuk menangani Selling
function handleSelling(event) {
    event.preventDefault();

    const date = document.getElementById('selling-date').value;
    const model = document.getElementById('selling-model').value;
    const type = document.getElementById('selling-type').value;
    const color = document.getElementById('selling-colour').value;
    const quantity = -Math.abs(parseInt(document.getElementById('selling-quantity').value));

    if (!date || !model || !type || !color || isNaN(quantity)) {
        alert('Please complete all fields before submitting.');
        return;
    }

    addToStockTable(model, type, { [color]: quantity }, true);

    // Reset input form setelah data berhasil disimpan
    document.getElementById('selling-date').value = '';
    document.getElementById('selling-model').value = '';
    document.getElementById('selling-type').value = '';
    document.getElementById('selling-colour').value = '';
    document.getElementById('selling-quantity').value = '';

    alert(`Selling data saved for ${model} (${type}) on ${date}. Stock has been updated.`);
}

// Fungsi untuk menangani Purchase
function handlePurchase(event) {
    event.preventDefault();

    const date = document.getElementById('purchase-date').value;
    const model = document.getElementById('purchase-model').value;
    const type = document.getElementById('purchase-type').value;
    const color = document.getElementById('purchase-colour').value;
    const quantity = Math.abs(parseInt(document.getElementById('purchase-quantity').value));

    if (!date || !model || !type || !color || isNaN(quantity)) {
        alert('Please complete all fields before submitting.');
        return;
    }

    addToStockTable(model, type, { [color]: quantity });

    // Reset input form setelah data berhasil disimpan
    document.getElementById('purchase-date').value = '';
    document.getElementById('purchase-model').value = '';
    document.getElementById('purchase-type').value = '';
    document.getElementById('purchase-colour').value = '';
    document.getElementById('purchase-quantity').value = '';

    alert(`Purchase data saved for ${model} (${type}) on ${date}. Stock has been updated.`);
}

// Inisialisasi halaman awal
document.addEventListener('DOMContentLoaded', () => {
    showPage('stock-items'); // Tampilkan halaman Stock Items
    updateStockTableFromLocalStorage(); // Muat ulang tabel dari Local Storage
});
