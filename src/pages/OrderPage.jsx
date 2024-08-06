import { useMenu } from "../component/MenuContext";
import { DeliveryTime, GetPosition, OrderTime } from "../lib/service";

function OrderPage() {
  const {
    orderCost,
    orderPriority,
    orderList,
    orderTax,
    user,
    phone,
    setConfirm,
    confirm,
    inputValue,
  } = useMenu();

  const estimateTime = orderList.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
  const averageMinsPerMeal = 5;

  function hanldeConfirm() {
    if (inputValue) {
      if (
        window.confirm(
          "Please review the following order details and click 'OK' if everything is correct."
        )
      ) {
        setConfirm(true);
      }
    } else {
      alert("Please fill out address information");
    }
  }
  return (
    <>
      {orderList.length ? (
        <div className="mt-5 h-full w-full flex justify-center overflow-auto ">
          <div className="flex mb-4 flex-col border w-order h-screen  px-4 border-gray-300 min-h-[400px] space-y-5 ">
            {" "}
            <div className="flex mt-2 flex-row justify-between w-96">
              <p>{user}'s Order Details</p>
              <div className="flex flex-row space-x-2">
                {orderPriority ? (
                  <div>
                    <div className="bg-red-400 rounded-full w-20 font-semibold text-center">
                      Priority
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {confirm ? (
                  <div className="bg-green-400 rounded-full w-20 font-semibold text-center">
                    Confirm
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <OrderTime />
            {orderPriority ? (
              <DeliveryTime time={estimateTime * averageMinsPerMeal * 0.8} />
            ) : (
              <DeliveryTime time={estimateTime * averageMinsPerMeal} />
            )}
            <ul className="w-full h-full flex flex-col mt-4 justify-center items-start">
              {orderList.map((item) => (
                <li
                  key={item.name}
                  className="flex  justify-between items-center w-full"
                >
                  <p>
                    {item.quantity} X {item.name}
                  </p>
                  <p>${item.price * item.quantity}</p>
                </li>
              ))}
              <div className="flex flex-col w-full h-full mt-14">
                <div className="flex flex-row w-full mt-2 justify-between items-center space-x-1">
                  <p className="font-semibold">Delivery Address: </p>
                  <GetPosition />
                </div>
                <div className="flex flex-row w-full mt-2 justify-between items-center">
                  <p className="font-semibold">Mobile number: </p>
                  <p>{phone}</p>
                </div>
                <div className="flex flex-row w-full mt-2 justify-between items-center">
                  <p className="font-semibold">HST:</p>
                  <p>${orderTax}</p>
                </div>
                <div className="flex flex-col w-full  items-center justify-center">
                  <div className="flex flex-row justify-between w-full">
                    <p className="font-semibold">Total Price After Tax:</p>
                    <p>${orderCost}</p>
                  </div>
                  {confirm ? (
                    ""
                  ) : (
                    <div className="mt-2 w-24 rounded-lg text-center h-8">
                      <button
                        onClick={hanldeConfirm}
                        className="w-full py-2 bg-slate-300 rounded-lg transition duration-300 ease-in-out transform hover:bg-slate-400 hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-semibold text-2xl"> Your order list is empty 🤔</p>
        </div>
      )}
    </>
  );
}

export default OrderPage;
