import { backendLocation } from './__env'


// Item routes
export const getAllItems = (sectionName, skip, limit, filter) => {

  return `${backendLocation}/api/items/get-all?limit=${limit}&skip=${skip}&section=${sectionName}&sortBy=updatedAt:desc${filter ? `&filter=${filter}` : ''}`

}

export const getProduct = (productID) => `${backendLocation}/api/items/get?_id=${productID}`

export const createProduct = (item_password) => `${backendLocation}/api/items/create?item_password=${item_password}`

export const updateProduct = (item_password, productID) => `${backendLocation}/api/items/update?item_password=${item_password}&_id=${productID}`

export const deleteProduct = (item_password, productID) => `${backendLocation}/api/items/delete?item_password=${item_password}&_id=${productID}`
