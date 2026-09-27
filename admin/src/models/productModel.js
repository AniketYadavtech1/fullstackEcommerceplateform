class ProductModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || "";
        this.description = data.description || "";
        this.category = data.category || "";
        this.brand = data.brand || "";
        this.price = data.price || 0;
        this.discountPrice = data.discount_price || 0;
        this.stock = data.stock || 0;
        this.sku = data.sku || "";
        this.imageUrl = data.image_url || "";
        this.status = data.status || "active";
        this.featured = data.featured || false;
    }
}
export default ProductModel;