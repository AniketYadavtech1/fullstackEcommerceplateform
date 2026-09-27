const API_URL = "http://localhost:5000/api/products";

export async function getProducts() {
    const response = await fetch(
        `${API_URL}/get-products`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const result = await response.json();
    return result.data;
}


export async function getProductById(id) {
    const response = await fetch(
        `${API_URL}/get-product/${id}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }
    const result = await response.json();
    return result.data;
}


export async function addProduct(productData) {
    const response = await fetch(
        `${API_URL}/add-product`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        }
    );



    if (!response.ok) {
        throw new Error("Failed to add product");
    }
    return await response.json();
}


export async function updateProduct(id, productData) {
    const response = await fetch(
        `${API_URL}/update-product/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productData)
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update product");
    }
    return await response.json();
}


export async function deleteProduct(id) {

    const response = await fetch(
        `${API_URL}/delete-product/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }

    return await response.json();
}