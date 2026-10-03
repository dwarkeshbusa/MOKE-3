let products = JSON.parse(localStorage.getItem("products")) || [
  {
    name: "Laptop",
    category: "Electronics",
    quantity: 15,
    price: 55000,
    supplier: "Dell",
  },

  {
    name: "Office Chair",
    category: "Furniture",
    quantity: 8,
    price: 7500,
    supplier: "Ikea",
  },

  {
    name: "Smartphone",
    category: "Electronics",
    quantity: 4,
    price: 25000,
    supplier: "Samsung",
  },

  {
    name: "T-Shirt",
    category: "Clothing",
    quantity: 25,
    price: 799,
    supplier: "Nike",
  },

  {
    name: "Keyboard",
    category: "Electronics",
    quantity: 0,
    price: 1500,
    supplier: "Logitech",
  },

  {
    name: "Table",
    category: "Furniture",
    quantity: 3,
    price: 12000,
    supplier: "WoodCraft",
  },
];

function displayProducts() {
  const table = document.getElementById("productTable");
  const searchText = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;

  table.innerHTML = "";

  products.forEach((product, index) => {
    const matchSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.supplier.toLowerCase().includes(searchText);

    const matchCategory = category === "all" || product.category === category;

    if (!matchSearch || !matchCategory) {
      return;
    }

    let status = "";
    let statusClass = "";

    if (product.quantity === 0) {
      status = "Out of Stock";
      statusClass = "out";
    } else if (product.quantity <= 5) {
      status = "Low Stock";
      statusClass = "low";
    } else {
      status = "In Stock";
      statusClass = "in";
    }

    table.innerHTML += `

            <tr>
                <td><span class="product-name">${product.name}</span></td>

                <td>${product.category}</td>

                <td>${product.quantity}</td>

                <td>₹${product.price.toLocaleString("en-IN")}</td>

                <td>${product.supplier}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${status}
                    </span>
                </td>

                <td>
                    <button class="action-btn edit" onclick="editProduct(${index})">✏️</button>
                    <button class="action-btn delete" onclick="deleteProduct(${index})">🗑️</button>
                </td>

            </tr>
        `;
  });

  updateDashboard();
}

function updateDashboard() {
  const total = products.length;

  const low = products.filter(
    (product) => product.quantity > 0 && product.quantity <= 5,
  ).length;

  const inStock = products.filter((product) => product.quantity > 0).length;

  const value = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0,
  );

  document.getElementById("totalProducts").textContent = total;
  document.getElementById("lowStock").textContent = low;
  document.getElementById("inStock").textContent = inStock;
  document.getElementById("stockValue").textContent =
    "₹" + value.toLocaleString("en-IN");
}

function openModal() {
  document.getElementById("productModal").style.display = "flex";
  document.getElementById("modalTitle").textContent = "Add Product";
  document.getElementById("productForm").reset();
  document.getElementById("editIndex").value = "";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    const quantity = Number(document.getElementById("quantity").value);
    const price = Number(document.getElementById("price").value);
    const supplier = document.getElementById("supplier").value;
    const editIndex = document.getElementById("editIndex").value;
    const product = {name,category,quantity,price,supplier,};

    if (editIndex !== "") {
      products[editIndex] = product;
    } else {
      products.push(product);
    }

    localStorage.setItem("products", JSON.stringify(products));

    closeModal();

    displayProducts();
  });

function editProduct(index) {
  const product = products[index];

  document.getElementById("productModal").style.display = "flex";
  document.getElementById("modalTitle").textContent = "Edit Product";
  document.getElementById("editIndex").value = index;
  document.getElementById("productName").value = product.name;
  document.getElementById("category").value = product.category;
  document.getElementById("quantity").value = product.quantity;
  document.getElementById("price").value = product.price;
  document.getElementById("supplier").value = product.supplier;
}

function deleteProduct(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this product?",
  );

  if (!confirmDelete) {
    return;
  }

  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}
displayProducts();