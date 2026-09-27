import ProductViewModel from "./viewmodels/productViewModel.js";
import ProductView from "./views/productView.js";


const productViewModel =
    new ProductViewModel();

const productView =
    new ProductView();


async function loadProducts() {

    try {

        const products =
            await productViewModel.loadProducts();

        productView.renderProducts(products);

    } catch (error) {

        alert("Unable to load products");
    }
}


productView.productForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        try {

            const productData =
                productView.getFormData();

            await productViewModel.createProduct(
                productData
            );

            productView.clearForm();

            await loadProducts();

            alert("Product added successfully");

        } catch (error) {

            alert("Failed to add product");
        }
    }
);


productView.productList.addEventListener(
    "click",
    async (event) => {

        if (
            !event.target.classList.contains(
                "delete-btn"
            )
        ) {
            return;
        }
        const id =
            event.target.dataset.id;        const confirmDelete =
            confirm(
                "Are you sure you want to delete?"
            );
        if (!confirmDelete) {
            return;
        }
        try {
            await productViewModel.removeProduct(
                id
            );
            await loadProducts();
            alert("Product deleted successfully");
        } catch (error) {
            alert("Failed to delete product");
        }
    }
);


loadProducts();