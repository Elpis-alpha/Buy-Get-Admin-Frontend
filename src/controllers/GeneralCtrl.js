import { capitalize } from './SpecialCtrl'


export const processCookies = () => { }

export const reterieveSectionName = (str) => {

  return capitalize(str.replace('section:', ''))

}

export const numberOfAllItemsInCart = (cartItem) => {

  let finalNumb = 0

  if (!cartItem.items) return finalNumb

  cartItem.items.forEach((item) => finalNumb += item.quantity)

  return finalNumb

}

