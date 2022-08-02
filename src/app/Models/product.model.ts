export class Product {
    [x: string]: any;
    constructor(
        id: number,
        description: string,
        image: string,
        price: number,
        title: string,
        category: string,
        uid ?: string,
        quanity?:number
    ) { }
}
