const pool = require("../config/database");

// Create product
const createProduct = async (product) => {

    const {
        name,
        description,
        category,
        brand,
        price,
        discountPrice,
        stock,
        sku,
        imageUrl,
        status,
        featured
    } = product;

    const query = `
        INSERT INTO products
        (
            name,
            description,
            category,
            brand,
            price,
            discount_price,
            stock,
            sku,
            image_url,
            status,
            featured
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *;
    `;

    const values = [
        name,
        description,
        category,
        brand,
        price,
        discountPrice || null,
        stock || 0,
        sku || null,
        imageUrl || null,
        status || "active",
        featured || false
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// Get all products
const getProducts = async () => {

    const result = await pool.query(`
        SELECT *
        FROM products
        ORDER BY created_at DESC;
    `);

    return result.rows;
};


// Get single product
const getProductById = async (id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM products
        WHERE id = $1;
        `,
        [id]
    );

    return result.rows[0];
};


// Update product
const updateProduct = async (id, product) => {

    const {
        name,
        description,
        category,
        brand,
        price,
        discountPrice,
        stock,
        sku,
        imageUrl,
        status,
        featured
    } = product;

    const query = `
        UPDATE products
        SET
            name = $1,
            description = $2,
            category = $3,
            brand = $4,
            price = $5,
            discount_price = $6,
            stock = $7,
            sku = $8,
            image_url = $9,
            status = $10,
            featured = $11,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *;
    `;

    const values = [
        name,
        description,
        category,
        brand,
        price,
        discountPrice || null,
        stock || 0,
        sku || null,
        imageUrl || null,
        status || "active",
        featured || false,
        id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// Delete product
const deleteProduct = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM products
        WHERE id = $1
        RETURNING *;
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};