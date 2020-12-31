import { useEffect, useState } from 'react';
import initialState from '../initialState';
import axios from 'axios'
const API = 'http://localhost:1337/products'
const API2 = 'https://us-central1-gndx-fake-api.cloudfunctions.net/api'

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const response = await axios(API2)
    setProducts(response.data)
  }, [])

  const addToCart = (payload) => {
    setState({
      ...state,
      cart: [...state.cart, payload],
    });
  };

  const removeFromCart = (payload) => {
    setState({
      ...state,
      cart: state.cart.filter((items) => items.id !== payload.id),
    });
  };

  const addToBuyer = (payload) => {
    setState({
      ...state,
      buyer: [...state.buyer, payload],
    });
  };

  const addNewOrder = (payload) => {
    setState({
      ...state,
      orders: [...state.orders, payload],
    });
  };

  return {
    addToCart,
    removeFromCart,
    addToBuyer,
    addNewOrder,
    state,
    products
  };
};

export default useInitialState;
