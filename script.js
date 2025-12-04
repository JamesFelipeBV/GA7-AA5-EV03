let productos = [];

// Referencias al DOM
const form = document.getElementById('productForm');
const nombreInput = document.getElementById('nombre');
const precioInput = document.getElementById('precio');
const stockInput = document.getElementById('stock');
const editIndexInput = document.getElementById('editIndex');
const tableBody = document.getElementById('productTable');

// Renderizar productos en la tabla
function renderTable() {
  tableBody.innerHTML = '';
  productos.forEach((producto, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>${producto.stock}</td>
      <td>
        <button class="action-btn edit" onclick="editProduct(${index})">Editar</button>
        <button class="action-btn delete" onclick="deleteProduct(${index})">Eliminar</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Agregar o modificar producto
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = nombreInput.value;
  const precio = parseFloat(precioInput.value);
  const stock = parseInt(stockInput.value);

  const editIndex = editIndexInput.value;

  if (editIndex === '') {
    // Agregar nuevo
    productos.push({ nombre, precio, stock });
  } else {
    // Modificar existente
    productos[editIndex] = { nombre, precio, stock };
    editIndexInput.value = '';
  }

  form.reset();
  renderTable();
});

// Editar producto
function editProduct(index) {
  const producto = productos[index];
  nombreInput.value = producto.nombre;
  precioInput.value = producto.precio;
  stockInput.value = producto.stock;
  editIndexInput.value = index;
}

// Eliminar producto
function deleteProduct(index) {
  productos.splice(index, 1);
  renderTable();
}
