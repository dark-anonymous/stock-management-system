// Navigasi antar halaman
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}

// Fungsi menambah atau memperbarui stok
function addToStockTable(model, type, quantities, isSelling = false) {
    const tableBody = document.querySelector('#stock-table tbody');
    let row = Array.from(tableBody.rows).find(r => r.cells[0].textContent === type && r.cells[1].textContent === model);

    if (!row) {
        // Jika baris tidak ditemukan, tambahkan baris baru
        row = document.createElement('tr');
        row.innerHTML = `<td>${type}</td><td>${model}</td>` + Object.keys(quantities).map(() => `<td>0</td>`).join('');
        tableBody.appendChild(row);
    }

    // Update stok pada baris yang ditemukan atau ditambahkan
    Object.keys(quantities).forEach((color, index) => {
        const cell = row.cells[index + 2];
        const newValue = Math.max((parseInt(cell.textContent) || 0) + quantities[color], 0); // Pastikan stok tidak negatif
        cell.textContent = newValue;
        cell.className = newValue > 0 ? 'green' : ''; // Tambahkan warna hijau jika stok lebih dari 0
    });
}

// Fungsi untuk penanganan data Selling
function handleSelling(event) {
    event.preventDefault();

    const date = document.getElementById('selling-date').value;
    const model = document.getElementById('selling-model').value;
    const type = document.getElementById('selling-type').value;
    const color = document.getElementById('selling-colour').value;
    const quantity = -Math.abs(parseInt(document.getElementById('selling-quantity').value));

    // Validasi input
    if (!date || !model || !type || !color || isNaN(quantity)) {
        alert('Please complete all fields before submitting.');
        return;
    }

    // Proses data dan update tabel
    addToStockTable(model, type, { [color]: quantity }, true);

    // Reset input field setelah data berhasil disimpan
    document.getElementById('selling-date').value = '';
    document.getElementById('selling-model').value = '';
    document.getElementById('selling-type').value = '';
    document.getElementById('selling-colour').value = '';
    document.getElementById('selling-quantity').value = '';

    alert(`Selling data saved for ${model} (${type}) on ${date}. Stock has been updated.`);
}

// Fungsi untuk penanganan data Purchase
function handlePurchase(event) {
    event.preventDefault();

    const date = document.getElementById('purchase-date').value;
    const model = document.getElementById('purchase-model').value;
    const type = document.getElementById('purchase-type').value;
    const color = document.getElementById('purchase-colour').value;
    const quantity = Math.abs(parseInt(document.getElementById('purchase-quantity').value));

    // Validasi input
    if (!date || !model || !type || !color || isNaN(quantity)) {
        alert('Please complete all fields before submitting.');
        return;
    }

    // Proses data dan update tabel
    addToStockTable(model, type, { [color]: quantity });

    // Reset input field setelah data berhasil disimpan
    document.getElementById('purchase-date').value = '';
    document.getElementById('purchase-model').value = '';
    document.getElementById('purchase-type').value = '';
    document.getElementById('purchase-colour').value = '';
    document.getElementById('purchase-quantity').value = '';

    alert(`Purchase data saved for ${model} (${type}) on ${date}. Stock has been updated.`);
}

// Inisialisasi halaman awal
document.addEventListener('DOMContentLoaded', () => showPage('stock-items'));
