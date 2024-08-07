import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useMenu } from "./MenuContext";
import Spinner from "./Spinner";
function FoodList({ field }) {
  const { allFood, loading, increase, decrease, cartList } = useMenu();
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/cart");
  };

  return !loading ? (
    <div>
      <div className="w-full border max-h-screen border-gray-300 p-4 ">
        <ul className="overflow-auto relative grid grid-cols-[1fr_70px] max-h-custom">
          <ul className=" max-h-custom px-12">
            {allFood.map((item) =>
              item.type === field ? (
                <li
                  key={item.id}
                  className="flex gap-4 py-2 mt-5 border-b-2 border-gray-300"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40  w-40"
                  />
                  <div className="grid grid-rowfulls-2 w-96 ">
                    <div>{item.name.toUpperCase()}</div>
                    <div className="relative w-full h-full">
                      <div className="absolute bottom-0 left-0">
                        ${item.price}
                      </div>
                    </div>
                  </div>

                  <div className="text-gray-800 w-full grid grid-rows-2 h-40">
                    <span className="first-letter:uppercase">
                      {item.ingredient
                        .split(",")
                        .map((word) => {
                          const firstWord = word.slice(0, 1).toUpperCase();
                          const remainWord = word.slice(1);
                          return firstWord + remainWord;
                        })
                        .join(", ")}
                    </span>
                    <div className="self-end flex space-x-6">
                      <Button id={item.id} handleCart={increase} field={"+"} />
                      <p className="w-2 text-center">{item.quantity}</p>
                      <Button id={item.id} handleCart={decrease} field={"-"} />
                    </div>
                  </div>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
          <span className="fixed bottom-6 right-12 cursor-pointer shadow-2xl z-50 ">
            {cartList.length ? (
              <button
                className={` ${cartList.length ? "animate-bounce" : ""}`}
                onClick={handleCartClick}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
              >
                <FaShoppingCart size={50} />
              </button>
            ) : (
              ""
            )}
          </span>
        </ul>
      </div>
    </div>
  ) : (
    <div className="w-full border max-h-screen border-gray-300 p-4 ">
      <Spinner />
    </div>
  );
}

export default FoodList;
