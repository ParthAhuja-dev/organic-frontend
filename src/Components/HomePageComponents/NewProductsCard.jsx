import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addItem, buyNow } from "../../services/cart/cartSlice";
import { Button } from "@material-tailwind/react";
import ShoppingCartDialog from "../UserComponents/ShoppingCart";
import { useDispatch } from "react-redux";

const Products = ({ product }) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = (
    productId,
    quantity,
    name,
    discountprice,
    imageUrl,
    size
  ) => {
    dispatch(
      addItem({ productId, quantity, name, discountprice, imageUrl, size })
    );
    handleOpen("xl");
  };

  const handleBuyNow = (
    productId,
    quantity,
    name,
    discountprice,
    imageUrl,
    size
  ) => {
    dispatch(
      buyNow({ productId, quantity, name, discountprice, imageUrl, size })
    );
    navigate("/checkout");
  };

  const handleOpen = (value) => {
    if (selectedSize) {
      setSize(value);
    } else {
      alert("Select a size first");
    }
  };

  useEffect(() => {
    setSelectedSize(product.sizes[0].size);
  }, []);

  return (
    <>
      <div className="bg-green-900 rounded-sm flex flex-col h-full">
        <img
          onClick={() => navigate(`/singleproduct/${product.id}`)} // Fixed the error here
          src={product.imageUrl[0]}
          className="sm:h-72 w-full object-cover rounded-t-sm"
          alt={product.name}
        />
        <div
          onClick={() => navigate(`/singleproduct/${product.id}`)} // Fixed the error here
          className="flex flex-col justify-between p-2 bg-green-900 h-44 space-y-2 md:px-4 md:py-4 rounded-b-sm flex-grow"
        >
          <div>
            <h2 className="text-white text-md sm:text-lg lg:text-xl font-bold">
              {product.name}
            </h2>
          </div>
          <div className="mt-auto">
            <p className="text-yellow-700 text-md sm:text-lg lg:text-xl font-semibold">
              ₹ {product.sizes[0].discountPrice}
            </p>
          </div>
        </div>

        {/* ... (rest of the component code remains the same) ... */}
        <div className="grid xl:grid-cols-2 lg:grid-cols-1 grid-cols-2 gap-3 mb-5 px-4">
          <Button
            onClick={() => {
              handleAddToCart(
                product.id,
                1,
                product.name,
                product.sizes[0].discountPrice,
                product.imageUrl[0],
                product.sizes[0].size
              );
            }}
            className="col-span-1 border rounded-lg px-3 py-2 text-lg font-semibold
             text-white bg-transparent capitalize"
          >
            Add to Cart
          </Button>
          <Button
            className="col-span-1 border bg-white
             border-white rounded-lg px-4 py-2 text-lg font-semibold text-green-900 capitalize"
            onClick={() => {
              handleBuyNow(
                product.id,
                1,
                product.name,
                product.sizes[0].discountPrice,
                product.imageUrl[0],
                product.sizes[0].size
              );
            }}
          >
            Buy Now
          </Button>
        </div>

        <ShoppingCartDialog size={size} handleOpen={handleOpen} />
      </div>
    </>
  );
};

export default Products;
