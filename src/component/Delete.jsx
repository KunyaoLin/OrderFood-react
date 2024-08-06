function Delete({ id, handleCart }) {
  return (
    <button
      onClick={() => handleCart(id)}
      className="rounded-lg bg-gray-500 h-8 w-20 hover:bg-red-600 text-xl transform active:scale-95"
    >
      Delete
    </button>
  );
}

export default Delete;
