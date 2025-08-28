let receiptCounter = localStorage.getItem("receiptCounter") ? parseInt(localStorage.getItem("receiptCounter")) : 1;
let stock = JSON.parse(localStorage.getItem("stock")) || {};
let records = JSON.parse(localStorage.getItem("records")) || [];

document.getElementById("purchaseForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.getElementById("customerName").value;
  let address = document.getElementById("customerAddress").value;
  let phone = document.getElementById("customerPhone").value;
  let item = document.getElementById("item").value;
  let quantity = parseInt(document.getElementById("quantity").value);
  let price = parseFloat(document.getElementById("price").value);
  let amountPaid = parseFloat(document.getElementById("amountPaid").value);

  let total = quantity * price;
  let balance = total - amountPaid;

  // Update stock
  if (!stock[item]) stock[item] = 100; // default stock 100 if not defined
  stock[item] -= quantity;

  // Create record
  let record = {
    receiptNo: String(receiptCounter).padStart(4, '0'),
    name, address, phone, item, quantity, price, total, amountPaid, balance, stockLeft: stock[item]
  };

  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));
  localStorage.setItem("stock", JSON.stringify(stock));

  addRecordToTable(record);

  receiptCounter++;
  localStorage.setItem("receiptCounter", receiptCounter);

  document.getElementById("purchaseForm").reset();
});

function addRecordToTable(record) {
  let table = document.querySelector("#recordsTable tbody");
  let row = table.insertRow();
  row.innerHTML = `
    <td>${record.receiptNo}</td>
    <td>${record.name}</td>
    <td>${record.address}</td>
    <td>${record.phone}</td>
    <td>${record.item}</td>
    <td>${record.quantity}</td>
    <td>${record.price}</td>
    <td>${record.total}</td>
    <td>${record.amountPaid}</td>
    <td>${record.balance}</td>
    <td>${record.stockLeft}</td>
  `;
}

function loadRecords() {
  records.forEach(record => addRecordToTable(record));
}

function searchCustomer() {
  let input = document.getElementById("searchName").value.toLowerCase();
  let rows = document.querySelectorAll("#recordsTable tbody tr");
  rows.forEach(row => {
    row.style.display = row.cells[1].innerText.toLowerCase().includes(input) ? "" : "none";
  });
}

window.onload = loadRecords;
