document.addEventListener('DOMContentLoaded', () => {
    const models = ["15 PROMAX 1TB", "15 PRO 512", "14 PROMAX 256"];
    const colours = ["Natural", "Blue", "White", "Black", "Yellow", "Pink", "Green", "Purple", "Gold", "Silver", "Red", "Grey", "Graphite", "Non Colour"];
    const suppliers = ["HQ", "Kluang", "Ipoh", "Tebing", "Trade In", "Sell"];
    const types = ["New Set", "Secondhand", "Installment"];

    const stockData = models.map(model => {
        const stock = {};
        colours.forEach(colour => {
            stock[colour] = 0;
        });
        return { model, type: types[0], stock };
    });

    const populateDropdown = (dropdown, items) => {
        items.forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            dropdown.appendChild(option);
        });
    };

    const updateStockTable = () => {
        const tableBody = document.getElementById('stock-items-body');
        tableBody.innerHTML = '';
        stockData.forEach(({ model, type, stock }) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${model}</td>
                <td>${type}</td>
                ${colours.map(colour => `<td>${stock[colour]}</td>`).join('')}
            `;
            tableBody.appendChild(row);
        });
    };

    const addToTable = (tableId, rowData) => {
        const tableBody = document.querySelector(`#${tableId} tbody`);
        const row = document.createElement('tr');
        row.innerHTML = rowData;
        tableBody.appendChild(row);
    };

    const clearForm = (formId) => {
        const form = document.getElementById(formId);
        form.reset();
    };

    const handleTransaction = (model, colour, quantity) => {
        const stockItem = stockData.find(item => item.model === model);
        if (stockItem && stockItem.stock.hasOwnProperty(colour)) {
            stockItem.stock[colour] += quantity;
            updateStockTable();
            return true;
        } else {
            alert("Invalid model or colour.");
            return false;
        }
    };

    populateDropdown(document.getElementById('sell-model'), models);
    populateDropdown(document.getElementById('purchase-model'), models);
    populateDropdown(document.getElementById('sell-colour'), colours);
    populateDropdown(document.getElementById('purchase-colour'), colours);
    populateDropdown(document.getElementById('purchase-supplier'), suppliers);

    updateStockTable();

    document.getElementById('selling-form').addEventListener('submit', event => {
        event.preventDefault();
        const date = document.getElementById('sell-date').value;
        const model = document.getElementById('sell-model').value;
        const colour = document.getElementById('sell-colour').value;
        const quantity = -Math.abs(parseInt(document.getElementById('sell-quantity').value, 10));

        if (handleTransaction(model, colour, quantity)) {
            alert(`Selling recorded:\nDate: ${date}\nModel: ${model}\nColour: ${colour}\nQuantity: ${Math.abs(quantity)}`);
            addToTable('selling-table', `<td>${date}</td><td>${model}</td><td>${colour}</td><td>${Math.abs(quantity)}</td>`);
            clearForm('selling-form');
        }
    });

    document.getElementById('purchase-form').addEventListener('submit', event => {
        event.preventDefault();
        const date = document.getElementById('purchase-date').value;
        const supplier = document.getElementById('purchase-supplier').value;
        const model = document.getElementById('purchase-model').value;
        const colour = document.getElementById('purchase-colour').value;
        const quantity = parseInt(document.getElementById('purchase-quantity').value, 10);

        if (handleTransaction(model, colour, quantity)) {
            alert(`Purchase recorded:\nDate: ${date}\nSupplier: ${supplier}\nModel: ${model}\nColour: ${colour}\nQuantity: ${quantity}`);
            addToTable('purchase-table', `<td>${date}</td><td>${supplier}</td><td>${model}</td><td>${colour}</td><td>${quantity}</td>`);
            clearForm('purchase-form');
        }
    });

    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetPage = link.getAttribute('data-page');
            pages.forEach(page => (page.style.display = page.id === targetPage ? 'block' : 'none'));
        });
    });
    document.getElementById('stock-items').style.display = 'block';
});
