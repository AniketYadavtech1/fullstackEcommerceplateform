import ProductModel from "../models/productModel.js";

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from "../services/productApi.js";


class ProductViewModel {

    constructor() {
        this.products = [];
        this.loading = false;
    }


    async loadProducts() {
        try {

            this.loading = true;

            const data = await getProducts();

            this.products =
                data.map(product => new ProductModel(product));

            return this.products;

        } finally {

            this.loading = false;
        }
    }


    async createProduct(productData) {

        try {

            const result = await addProduct(
                productData
            );

            await this.loadProducts();

            return result;

        } catch (error) {

            console.error(
                "Create product error:",
                error
            );

            throw error;
        }
    }


    async editProduct(id, productData) {

        try {

            const result = await updateProduct(
                id,
                productData
            );

            await this.loadProducts();

            return result;

        } catch (error) {

            console.error(
                "Update product error:",
                error
            );

            throw error;
        }
    }


    async removeProduct(id) {

        try {

            const result = await deleteProduct(id);

            await this.loadProducts();

            return result;

        } catch (error) {

            console.error(
                "Delete product error:",
                error
            );

            throw error;
        }
    }
}


export default ProductViewModel;