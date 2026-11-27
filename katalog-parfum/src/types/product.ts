export interface Review{
    rating: number
    comment: string
    date: string
    reviewerName: string
}

export interface Product{
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand?: string
    thumbnail: string
    image: string[]
    reviews?: Review[]
}

export interface ProductResponse{
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface Notrequest{
    id: number
    namaParfum: string
    merek: string
    kategori: string
    budgetMaksimal: number
    catatan: string
    tanggal : string
}