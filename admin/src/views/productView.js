class ProductView {

    constructor() {
        this.productList =
            document.getElementById("productList");

        this.productForm =
            document.getElementById("productForm");
    }

   renderProducts(products) {
    this.productList.innerHTML = "";
    products.forEach(product => {
        this.productList.innerHTML += `
            <div class="product-row">

                <div class="product-info">

                    <div class="product-image">
                        📦
                    </div>

                    <div>
                        <strong>${product.name}</strong>
                        <small>${product.category}</small>
                    </div>

                </div>

                <span>
                    ₹${Number(product.price).toLocaleString("en-IN")}
                </span>

                <span>
                    ${product.stock}
                </span>

                <span class="status active-status">
                    ${product.status}
                </span>

                <button
                    class="edit"
                    data-id="${product.id}">
                    Edit
                </button>

            </div>
        `;
    });

    document.getElementById("productCount").textContent =
        `${products.length} products in your store`;
}


    getFormData() {
        return {
            name:
                document.getElementById("name").value,
            description:
                document.getElementById("description").value,
            category:
                document.getElementById("category").value,
            brand:
                document.getElementById("brand").value,
            price:
                Number(
                    document.getElementById("price").value
                ),
            discountPrice:
                Number(
                    document.getElementById(
                        "discountPrice"
                    ).value
                ),

            stock:
                Number(
                    document.getElementById("stock").value
                ),

            sku:
                document.getElementById("sku").value,

            imageUrl:
                document.getElementById("imageUrl").value,

            status:
                document.getElementById("status").value,

            featured:
                document.getElementById("featured").checked
        };
    }

    clearForm() {

        this.productForm.reset();
    }
}


export default ProductView;