function Button({ id, field, handleCart }) {
  return (
    <button
      onClick={() => handleCart(id)}
      className="rounded border bg-gray-400 size-8 hover:bg-blue-300 text-xl transform active:scale-95"
    >
      {field}
    </button>
  );
}

export default Button;

// className="rounded border bg-gray-400 size-8 hover:bg-blue-300 text-xl"
// style={{ outline: "none" }}
