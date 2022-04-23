import React, { createContext, useState } from 'react'
import { useLocalStorage } from '@mantine/hooks'

type TItem = {
  product: any
  quantity: number
}

type TCart = {
  items: TItem[]
  total: number
}

const CartContext = createContext<any>(null)

type TProps = {
  children: React.ReactNode | undefined
}

const CartProvider: React.FC<TProps> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<TCart>({
    key: 'cart',
    defaultValue: {
      items: [],
      total: 0
    }
  })

  const computeTotal = (items: TItem[]) =>
    items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0)

  const isItemInCart = (id: string) =>
    cart.items.filter((item) => item.product.id === id).length > 0

  const getProductQuantity = (id: string) =>
    cart.items.filter((item) => item.product.id === id)[0]?.quantity || 0

  const updateItemQuantity = (product: any, quantity: number) => {
    const newCart = cart.items.map((item) => {
      if (item.product.id === product.id) {
        return {
          ...item,
          quantity
        }
      }

      return item
    })

    const filteredCartItems = newCart.filter((item) => item.quantity !== 0)

    setCart({
      items: filteredCartItems,
      total: computeTotal(newCart)
    })
  }

  const addItemToCart = (product: any, quantity: number) => {
    let isItemInCart = false
    let newCart = cart.items.map((item) => {
      if (item.product.id === product.id) {
        isItemInCart = true
        return {
          ...item,
          quantity: item.product.quantity + quantity
        }
      } else {
        return item
      }
    })

    if (isItemInCart) {
      setCart(() => ({
        items: newCart,
        total: computeTotal(newCart)
      }))
    } else {
      newCart = [...cart.items, { product, quantity }]
      setCart(() => ({
        items: newCart,
        total: computeTotal(newCart)
      }))
    }
  }

  const totalNumberOfProducts = () =>
    cart.items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        getProductQuantity,
        isItemInCart,
        addItemToCart,
        updateItemQuantity,
        totalNumberOfProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartContext }
export default CartProvider
