/**
 * 商品
 */
export interface Product {
    title: string;
    kind: string;
    price: number;
}

/**
 * 销售
 */
export interface Seller {
    name: string;
}

/**
 * 销售记录
 */
export interface Sell {
    id: string;
    product: string;
    seller: string;
    quantity: number;
}

const ProductKinds: string[] = ['Toys', 'Laptop', 'Food', 'Camera'];

export function createProducts(count: number): Product[] {
    const products: Product[] = [];
    for (let i = 0; i < count; i++) {
        products.push({
            title: `Product${i}`,
            kind: randomIn<string>(ProductKinds),
            price: Math.floor(Math.random() * 100) + 1,
        });
    }
    return products;
}

export function createSellers(count: number): Seller[] {
    const sellers: Seller[] = [];
    for (let i = 0; i < count; i++) {
        sellers.push({
            name: `Seller${i}`,
        });
    }
    return sellers;
}

export function createSells(products: Product[], sellers: Seller[], count: number): Sell[] {
    const sells: Sell[] = [];
    for (let i = 0; i < count; i++) {
        sells.push({
            id: i.toString(),
            product: randomIn<Product>(products).title,
            seller: randomIn<Seller>(sellers).name,
            quantity: Math.floor(Math.random() * 10) + 1,
        });
    }
    return sells;
}

function randomIn<T>(sources: T[]): T {
    const index = Math.floor(Math.random() * sources.length);
    return sources[index];
}
