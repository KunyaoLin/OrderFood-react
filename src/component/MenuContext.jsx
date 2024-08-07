import { createContext, useContext, useEffect, useReducer } from "react";
import { taxRate } from "../lib/service";
const initialState = {
  loading: false,
  cartList: [],
  orderList: [],
  orderCost: 0,
  orderPriority: false,
  allFood: [],
  error: "",
  cost: 0,
  user: null,
  totalCost: 0,
  isAuthenticated: false,
  priority: false,
  orderTax: 0,
  phone: null,
  confirm: false,
  inputValue: "",
};
const MenuContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "getFood":
      return { ...state, allFood: action.payload };
    case "increase":
      const increaseAllFood = state.allFood.map((item) => {
        if (item.id === action.payload)
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        return item;
      });
      return {
        ...state,
        allFood: increaseAllFood,
        cartList: increaseAllFood.filter((item) => {
          if (item.quantity !== 0) return { ...item };
        }),
      };
    case "decrease":
      const decreaseAllFood = state.allFood.map((item) => {
        if (item.id === action.payload)
          return {
            ...item,
            quantity: item.quantity === 0 ? 0 : item.quantity - 1,
          };
        return item;
      });
      return {
        ...state,
        allFood: decreaseAllFood,
        cartList: decreaseAllFood.filter((item) => {
          if (item.quantity !== 0) return { ...item };
        }),
      };
    case "increaseCart":
      return {
        ...state,
        allFood: state.allFood.map((item) => {
          if (item.id === action.payload)
            return { ...item, quantity: item.quantity + 1 };
          return { ...item };
        }),
        cartList: state.cartList.map((item) => {
          if (item.id === action.payload)
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          return { ...item };
        }),
      };
    case "decreaseCart":
      return {
        ...state,
        allFood: state.allFood.map((item) => {
          if (item.id === action.payload)
            return {
              ...item,
              quantity: item.quantity === 0 ? 0 : item.quantity - 1,
            };
          return { ...item };
        }),
        cartList: state.cartList.map((item) => {
          if (item.id === action.payload) {
            if (item.quantity > 0)
              return { ...item, quantity: item.quantity - 1 };
            else {
              return { ...item, quantity: 0 };
            }
          }
          return { ...item };
        }),
      };
    case "delete":
      const deleteCart = state.cartList.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        allFood: state.allFood.map((item) => {
          if (item.id === action.payload)
            return {
              ...item,
              quantity: 0,
            };
          return item;
        }),
        cartList: deleteCart,
      };
    case "removeCart":
      return {
        ...state,
        allFood: state.allFood.map((item) => {
          return { ...item, quantity: 0 };
        }),
        cartList: action.payload,
      };
    case "foodCost":
      return { ...state, cost: action.payload };
    case "totalCost":
      return { ...state, totalCost: action.payload };
    case "rejected":
      return { ...state, error: action.payload };
    case "signIn":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.name,
        phone: action.payload.phone,
      };
    case "signOut":
      return {
        ...state,
        allFood: state.allFood.map((item) => {
          return { ...item, quantity: 0 };
        }),
        cartList: [],
        isAuthenticated: false,
        user: null,
      };
    case "priority":
      return { ...state, priority: action.payload };
    case "orderList":
      return {
        ...state,
        orderList: state.cartList,
        allFood: state.allFood.map((item) => {
          return { ...item, quantity: 0 };
        }),
        cartList: action.payload,
        orderCost: state.totalCost,
        orderTax: state.cartList.reduce((acc, cur) => {
          return acc + cur.quantity * cur.price * taxRate;
        }, 0),
        orderPriority: state.priority,
        confirm: false,
        inputValue: null,
      };
    case "inputValue":
      return {
        ...state,
        inputValue: action.payload,
      };
    case "confirm":
      return { ...state, confirm: action.payload };
    default:
      throw new Error("unknow action type");
  }
}
function MenuProvider({ children }) {
  const [
    {
      allFood,
      cartList,
      error,
      cost,
      isAuthenticated,
      user,
      totalCost,
      priority,
      orderList,
      orderCost,
      orderPriority,
      orderTax,
      phone,
      inputValue,
      confirm,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  function getFood(data) {
    dispatch({ type: "getFood", payload: data });
  }
  function rejected() {
    dispatch({ type: "rejected", payload: error });
  }

  function increase(id) {
    dispatch({ type: "increase", payload: id });
  }

  function decrease(id) {
    dispatch({ type: "decrease", payload: id });
  }
  function deleteOrder(id) {
    if (window.confirm("Are you sure to delete this item?")) {
      dispatch({ type: "delete", payload: id });
    }
  }
  function increaseCart(id) {
    dispatch({ type: "increaseCart", payload: id });
  }
  function decreaseCart(id) {
    dispatch({ type: "decreaseCart", payload: id });
  }
  function removeCart() {
    dispatch({ type: "removeCart", payload: [] });
  }
  function setTotalCost(totalCost) {
    dispatch({ type: "totalCost", payload: totalCost });
  }
  function setFoodCost(foodCost) {
    dispatch({ type: "foodCost", payload: foodCost });
  }
  function signIn(userName) {
    dispatch({ type: "signIn", payload: userName });
  }
  function signOut() {
    dispatch({ type: "signOut" });
  }
  function setPriority(type) {
    dispatch({ type: "priority", payload: type });
  }
  function setOrderList() {
    dispatch({ type: "orderList", payload: [] });
  }
  function setConfirm(type) {
    dispatch({ type: "confirm", payload: type });
  }
  function setInputValue(value) {
    dispatch({ type: "inputValue", payload: value });
  }
  return (
    <MenuContext.Provider
      value={{
        increase,
        decrease,
        increaseCart,
        decreaseCart,
        deleteOrder,
        cartList,
        allFood,
        error,
        cost,
        removeCart,
        setTotalCost,
        signIn,
        signOut,
        user,
        setFoodCost,
        setTotalCost,
        isAuthenticated,
        totalCost,
        setPriority,
        priority,
        orderList,
        setOrderList,
        orderCost,
        orderPriority,
        orderTax,
        phone,
        setConfirm,
        confirm,
        inputValue,
        setInputValue,
        getFood,
        rejected,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
function useMenu() {
  const context = useContext(MenuContext);
  if (context === undefined)
    throw new Error("MenuContext was used outside the MenuProvider");
  return context;
}

export { MenuProvider, useMenu };
