const BASE_URL = 'https://72xqy7cfye.execute-api.us-east-1.amazonaws.com/warehouse-v1';

const API_ROUTES = {
    GET_PRODUCTS: `${BASE_URL}/products`,
    ADD_PRODUCT: `${BASE_URL}/products`,
    DELETE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
    UPDATE_PRODUCT: (id) => `${BASE_URL}/products/${id}`,
    GET_BARCODE: `${BASE_URL}/products/status`,

};
export default API_ROUTES;

