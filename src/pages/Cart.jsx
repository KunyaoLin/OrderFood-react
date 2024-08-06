import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CartItem from "../component/CartItem";
import { useMenu } from "../component/MenuContext";
import NavBar from "../component/NavBar";
import style from "./Cartpage.module.css";
function Cart() {
  const {
    deleteOrder,
    removeCart,
    cartList,
    increaseCart,
    decreaseCart,
    calcTotal,
    setFoodCost,
    setTotalCost,
    cost,
    totalCost,
    setPriority,
    priority,
    setOrderList,
    setConfirm,
  } = useMenu();

  const navigate = useNavigate();
  function handleOrder(e) {
    e.preventDefault();
    setOrderList();
    navigate("/account/order");
  }
  function handleRemoveCart(e) {
    e.preventDefault();
    if (window.confirm("Are you sure to empty your cart?")) {
      removeCart();
      navigate("/menu");
    }
  }
  useEffect(() => {
    const costArr = cartList?.map((i) => {
      return { num: i.quantity, price: i.price };
    });
    if (costArr.length === 0) {
      setFoodCost(0);
      setTotalCost(0);
      return;
    }
    const total = costArr.reduce((acc, cur) => {
      return acc + cur.num * cur.price;
    }, 0);
    setFoodCost(Math.floor(total));
    if (priority) {
      setTotalCost(Math.floor(total * 1.15) + 10);
    } else {
      setTotalCost(Math.floor(total * 1.15));
    }
  }, [cartList, priority]);
  return (
    <div className={style.CartPage}>
      <div>
        <NavBar />
      </div>
      <div className="grid grid-rows-[600px_20px] p-3 h-full mt-16 w-full fixed">
        {cartList.length === 0 ? (
          <p className="text-center text-xl font-semibold">
            {" "}
            Your Cart is Empty{" "}
          </p>
        ) : (
          <div className="flex flex-col items-center ">
            <p className="text-center text-xl font-semibold"> 🛒 Your Cart </p>
            <ul className="flex flex-col overflow-auto mt-4 max-h-cart ">
              {cartList?.map((food) =>
                food ? (
                  <li
                    className="flex items-center justify-center"
                    key={food.id}
                  >
                    {" "}
                    <CartItem
                      calcTotal={calcTotal}
                      id={food.id}
                      num={food.quantity}
                      price={food.price}
                      foodName={food.name}
                      increaseCart={increaseCart}
                      decreaseCart={decreaseCart}
                      deleteOrder={deleteOrder}
                    />
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>

            <div className="flex flex-col py-5  w-96">
              <span className="flex-row flex justify-between">
                <p>Priority Order? (Estimate 20% time save)</p>
                <input
                  type="checkbox"
                  name="priority"
                  checked={priority}
                  onChange={(e) => setPriority(e.target.checked)}
                ></input>
              </span>
              <div className="mt-5">
                <span className="flex flex-row justify-between">
                  <p>Sub Total:</p>
                  <p>${cost}</p>
                </span>

                <span className="flex flex-row justify-between">
                  <p>HST:</p>
                  <p>${Math.floor(cost * 0.15)}</p>
                </span>

                <span className="flex flex-row justify-between">
                  <p>Priority Fee:</p>
                  <p>{priority === true ? "$10" : "$0"}</p>
                </span>

                <span className="flex flex-row justify-between">
                  <p>Total Price:</p>
                  <p>${totalCost}</p>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="h-12 w-full mb-0 grid grid-cols-2">
          <div className="flex align-top justify-center">
            <button
              onClick={() => navigate("/menu")}
              className="w-40 h-10 flex space-x-2 bg-gray-300 hover:hover:bg-blue-300 rounded-full items-center justify-center transform active:scale-95"
            >
              <span className="py-1">
                <IoArrowBack />
              </span>{" "}
              <p>Back to Menu</p>
            </button>
          </div>
          <div className="flex flex-row space-x-10">
            <button
              disabled={cartList.length === 0}
              onClick={handleRemoveCart}
              className={`flex w-40 h-10 flex-row space-x-2 ${
                cartList.length === 0
                  ? "bg-gray-300 bg-opacity-50"
                  : "bg-gray-300 hover:bg-blue-300 transform active:scale-95"
              } rounded-full items-center justify-center `}
            >
              <span className="py-1">
                <MdDelete />
              </span>
              <p>Clear Cart</p>
            </button>
            <button
              onClick={handleOrder}
              disabled={cartList.length === 0}
              className={`flex w-40 h-10 flex-row space-x-2 ${
                cartList.length === 0
                  ? "bg-gray-300 bg-opacity-50"
                  : "bg-gray-300 hover:bg-blue-300 transform active:scale-95"
              } rounded-full items-center justify-center`}
            >
              <p className="font-semibold text-lg">
                ${cost === 0 ? "" : `${totalCost}`}
              </p>
              <p>Order Now</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
