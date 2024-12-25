document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('nav a');
    const stockTable = document.getElementById('stock-items-body');
    const sellingRecordsTable = document.getElementById('selling-records').querySelector('tbody');
    const purchaseRecordsTable = document.getElementById('purchase-records').querySelector('tbody');

    const stockData = [];
    const sellingRecords = [];
    const purchaseRecords = [];
    const models = ["15 PROMAX 1TB","15 PROMAX 512","15 PROMAX 256","15 PRO 1TB","15 PRO 512","15 PRO 256","15 PRO 128","15 PLUS 512",,"15 PLUS 256","15 PLUS 128","15 512","15 256","15 128","14 PROMAX 1TB","14 PROMAX 512",
"14 PROMAX 256","14 PROMAX 128","14 PRO 1TB","14 PRO 512","14 PRO 256","14 PRO 128","14 PLUS 512","14 PLUS 256","14 PLUS 128","14 512","14 256","14 128","ESIM 14 PRO MAX 256","ESIM 14 PLUS 256","ESIM 14 PRO 512",
"ESIM 14 PRO 128","IPAD MINI 5 64 W/C","13 PROMAX 1TB","13 PROMAX 512","13 PROMAX 256","13 PROMAX 128","13 PRO 1TB","13 PRO 512","13 PRO 256","13 PRO 128","13 512","13 256","13 128","13 MINI 512","13 MINI 256",
"13 MINI 128","12 PROMAX 512","12 PROMAX 256","12 PROMAX 128","12 PRO 512","12 PRO 256","12 PRO 128","12 256","12 128","12 64","11 256","11 128","11 64","DEMO SET Y76","DEMO SET Y77","Y36 5G",
"Y18 8/128","Y28S 5G 8/256","Y27 4G","V27 8/256","V27 12/256","C30S 3/32","C30S 4/64","C35 4/64","C35 6/128","C51 4/128","C53 6/128","C55 6/128","C55 8/256","C67 8/128","C67 8/256","9 4G 8/128","10 4G 8/256",
"10 PRO 5G 8/256","NOTE 60 4/128","GT 3 16/1TB","GT 20 PRO 12/256GB","A60 8/256","A38 6/128","RENO 6Z 5G 8/128","RENO 12F 5G 12/256","MI 11T 8/128","MI 11 T 8/256","MI 11 LITE 128","MI 11 LITE 256","MI 11T PRO 12/256",
"MI 12 8/256","REDMI 14C 8/256","REDMI 13 C 6/128","REDMI 13 4G 8/256","MI BAND 7 REG","MI BAND 7 DEMO","A52 8/256","A52S 5G 8/256","A33 5G 8/128","S23 ULTRA 12/512GB","WATCH 4 40MM","WATCH 4 45MM",
"HOT 40 PRO 8/256GB","ASUS ROG 8 PRO 16/512","STEAMDECK","PS5","PS5 SLIM","NINTENDO SWITCH OLED","SECONDHAND - 15 PROMAX 1TB","SECONDHAND - 15 PROMAX 512","SECONDHAND - 15 PROMAX 256","SECONDHAND - 15 PRO 1TB","SECONDHAND - 15 PRO 512",
"SECONDHAND - 15 PRO 256","SECONDHAND - 15 PRO 128","SECONDHAND - 15 PLUS 512","SECONDHAND - 15 PLUS 256","SECONDHAND - 15 PLUS 128","SECONDHAND - 15 512","SECONDHAND - 15 256","SECONDHAND - 15 128","SECONDHAND - 14 PROMAX 1TB",
"SECONDHAND - 14 PROMAX 512","SECONDHAND - 14 PROMAX 256","SECONDHAND - 14 PROMAX 128","SECONDHAND - 14 PRO 1TB","SECONDHAND - 14 PRO 512","SECONDHAND - 14 PRO 256","SECONDHAND - 14 PRO 128","SECONDHAND - 14 PLUS 512",
"SECONDHAND - 14 PLUS 256","SECONDHAND - 14 PLUS 128","SECONDHAND - 14 512","SECONDHAND - 14 256","SECONDHAND - 14 128","SECONDHAND - 13 PROMAX 1TB","SECONDHAND - 13 PROMAX 512","SECONDHAND - 13 PROMAX 256","SECONDHAND - 13 PROMAX 128",
"SECONDHAND - 13 PRO 1TB","SECONDHAND - 13 PRO 512","SECONDHAND - 13 PRO 256","SECONDHAND - 13 PRO 128","SECONDHAND - 13 512","SECONDHAND - 13 256","SECONDHAND - 13 128","SECONDHAND - 12 PROMAX 512","SECONDHAND - 12 PROMAX 256",
"SECONDHAND - 12 PROMAX 128","SECONDHAND - 12 PRO 512","SECONDHAND - 12 PRO 256","SECONDHAND - 12 PRO 128","SECONDHAND - 12 256","SECONDHAND - 12 128","SECONDHAND - 12 64","SECONDHAND - 11 PROMAX 512","SECONDHAND - 11 PROMAX 256",
"SECONDHAND - 11 PROMAX 64","SECONDHAND - 11 PRO 512","SECONDHAND - 11 PRO 256","SECONDHAND - 11 PRO 64","SECONDHAND - 11 256","SECONDHAND - 11 128","SECONDHAND - 11 64","SECONDHAND - XS MAX 512","SECONDHAND - XS MAX 256","SECONDHAND -XS MAX 64",
"SECONDHAND - XS 512","SECONDHAND - XS 256","SECONDHAND - XS 64","SECONDHAND - XR 256","SECONDHAND - XR 128","SECONDHAND - XR 64","SECONDHAND - X 256","SECONDHAND - X 64","SECONDHAND - 8 PLUS 256","SECONDHAND - 8 PLUS 64","SECONDHAND - SE 2020 128",
"SECONDHAND - 8 256","SECONDHAND - 8 64","SECONDHAND - 7 PLUS 256","SECONDHAND - 7 PLUS 128","SECONDHAND - 7 PLUS 32","SECONDHAND - 7 256","SECONDHAND - 7 128","SECONDHAND - 7 32","SECONDHAND - IPAD PRO 11 INCH 1TB","SECONDHAND - IPAD 10TH 64GB WIFI","SECONDHAND - HUAWEI MATEPAD WIFI 6/128GB",
"SECONDHAND - REDMI NOTE 10T 5G 4/64","INS 15 PROMAX 1TB","INS 15 PROMAX 512","INS 15 PROMAX 256","INS 15 PRO 1TB","INS 15 PRO 512","INS 15 PRO 256","INS 15 PRO 128","INS 15 PLUS 512","INS 15 PLUS 256","INS 15 PLUS 128","INS 15 512",
"INS 15 256","INS 15 128","INS 14 PROMAX 1TB","INS 14 PROMAX 512","INS 14 PROMAX 256","INS 14 PROMAX 128","INS 14 PRO 1TB","INS 14 PRO 512","INS 14 PRO 256","INS 14 PRO 128","INS 14 PLUS 512","INS 14 PLUS 256","INS 14 PLUS 128","INS 14 512","INS 14 256","INS 14 128",
"INS 13 512","INS 13 128","INS 13 256","INS IPAD 6TH 256GB WIFI","INS IPAD 10TH 256GB W/C","INS S24 5G 8/256GB","INS S24 ULTRA 5G 12/1TB","INS VIVO X100 PRO 16/512GB","INS PS5 SLIM DISC","INS 16 128","INS 16 256","INS 16 512","INS 16 PRO 128","INS 16 PRO 256","INS 16 PRO 512","INS 16 PLUS 256",
"INS 16 PROMAX 256","INS 16 PROMAX 512",];

    const sellModelSelect = document.getElementById('sell-model');
    const purchaseModelSelect = document.getElementById('purchase-model');

    const initializeStockData = () => {
        models.forEach(model => {
            stockData.push({
                model,
                colours: {
                    natural: 0,
                    blue: 0,
                    white: 0,
                    black: 0,
                    yellow: 0,
                    pink: 0,
                    green: 0,
                    purple: 0,
                    gold: 0,
                    silver: 0,
                    red: 0,
                    grey: 0,
                    graphite: 0,
                    noncolour: 0,
                }
            });
        });
    };

    const updateStockTable = () => {
        stockTable.innerHTML = '';
        stockData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.model}</td>
                ${Object.keys(item.colours).map(colour => {
                    const value = item.colours[colour];
                    const cellClass = value > 0 ? 'green' : 'white';
                    return `<td class="${cellClass}">${value}</td>`;
                }).join('')}
            `;
            stockTable.appendChild(row);
        });
    };

    const populateModelDropdowns = () => {
        models.forEach(model => {
            const option1 = new Option(model, model);
            const option2 = new Option(model, model);
            sellModelSelect.add(option1);
            purchaseModelSelect.add(option2);
        });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.dataset.page;

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            pages.forEach(page => {
                page.classList.toggle('active', page.id === targetPage);
            });
        });
    });

    document.getElementById('selling-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('sell-date').value;
        const model = sellModelSelect.value;
        const colour = document.getElementById('sell-colour').value;
        const quantity = parseInt(document.getElementById('sell-quantity').value, 10);

        const stockItem = stockData.find(item => item.model === model);
        if (stockItem && stockItem.colours[colour] >= quantity) {
            stockItem.colours[colour] -= quantity;
            sellingRecords.push({ date, model, colour, quantity });
            updateSellingRecordsTable();
            updateStockTable();
            alert('Selling successfully recorded!');
            e.target.reset();
        } else {
            alert('Error: Insufficient stock.');
        }
    });

    document.getElementById('purchase-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('purchase-date').value;
        const supplier = document.getElementById('purchase-supplier').value;
        const model = document.getElementById('purchase-model').value;
        const colour = document.getElementById('purchase-colour').value;
        const quantity = parseInt(document.getElementById('purchase-quantity').value, 10);

        const stockItem = stockData.find(item => item.model === model);
        stockItem.colours[colour] += quantity;

        purchaseRecords.push({ date, supplier, model, colour, quantity });
        updatePurchaseRecordsTable();
        updateStockTable();
        alert('Purchase successfully recorded!');
        e.target.reset();
    });

    const updateSellingRecordsTable = () => {
        sellingRecordsTable.innerHTML = '';
        sellingRecords.forEach(record => {
            const row = `<tr>
                <td>${record.date}</td>
                <td>${record.model}</td>
                <td>${record.colour}</td>
                <td>${record.quantity}</td>
            </tr>`;
            sellingRecordsTable.insertAdjacentHTML('beforeend', row);
        });
    };

    const updatePurchaseRecordsTable = () => {
        purchaseRecordsTable.innerHTML = '';
        purchaseRecords.forEach(record => {
            const row = `<tr>
                <td>${record.date}</td>
                <td>${record.supplier.toUpperCase()}</td>
                <td>${record.model}</td>
                <td>${record.colour}</td>
                <td>${record.quantity}</td>
            </tr>`;
            purchaseRecordsTable.insertAdjacentHTML('beforeend', row);
        });
    };

    initializeStockData();
    populateModelDropdowns();
    updateStockTable();
});
