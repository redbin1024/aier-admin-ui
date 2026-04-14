import request from '@/utils/request';

export interface ProductRecord {
  id?: string;
  productName: string;
  category: string;
  price: number;
  status: string;
  // Add other fields as needed
}

export interface ProductListParams {
  current?: number;
  pageSize?: number;
  productName?: string;
  category?: string;
  status?: string;
}

export function listProducts(params: ProductListParams) {
  return request.get('/ai/products/list', { params });
}

export function listAllProducts() {
  return request.get('/ai/products/all');
}

export function getProduct(id: string) {
  return request.get(`/ai/products/${id}`);
}

export function addProduct(data: ProductRecord) {
  return request.post('/ai/products', data);
}

export function updateProduct(data: ProductRecord) {
  return request.put('/ai/products', data);
}

export function delProduct(id: string) {
  return request.delete(`/ai/products/${id}`);
}
