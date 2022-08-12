import { backendLocation } from './__env'


// Item routes
export const getAllBuyGet = (sectionName, skip, limit, filter) => {

  return `${backendLocation}/api/buyGet/get-all?limit=${limit}&skip=${skip}&section=${sectionName}&sortBy=updatedAt:desc${filter ? `&filter=${filter}` : ''}`

}

export const getAllBuyGetSimple = () =>  `${backendLocation}/api/buyGet/get-all`

export const getPromo = (promoTitle) => `${backendLocation}/api/buyGet/getSingle?title=${promoTitle}`

export const createPromo = () => `${backendLocation}/api/buyGet/create`

export const updatePromo = (promoTitle) => `${backendLocation}/api/buyGet/update?title=${promoTitle}`

export const deletePromo = (promoTitle) => `${backendLocation}/api/buyGet/delete?title=${promoTitle}`
