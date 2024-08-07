import Button from "./Button";
import Delete from "./Delete";

function CartItem({
  num,
  foodName,
  price,
  id,
  increaseCart,
  decreaseCart,
  deleteOrder,
}) {
  return (
    <div className="grid grid-cols-2 w-cart mt-5">
      <div className=" flex w-full">
        <p className="w-14">{num === 0 ? "" : num + "X"}</p>
        <p>
          ${price} {foodName}
        </p>
      </div>
      <div className="flex items-center gap-1 space-x-2">
        <p className="w-10 text-start">${price * num}</p>
        <Button handleCart={increaseCart} id={id} field={"+"} />
        <p className="w-7 text-center">{num}</p>
        <Button handleCart={decreaseCart} id={id} field={"-"} />
        <Delete className="ml-4" handleCart={deleteOrder} id={id} />
      </div>
    </div>
  );
}

export default CartItem;
