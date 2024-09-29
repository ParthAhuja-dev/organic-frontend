import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, buyNow } from "../../services/cart/cartSlice";
import ShoppingCartDialog from "./ShoppingCart";

export default function ProductCard({ product }) { 
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


  function redirectToProductPage(id) {
    if (id === undefined || id === null || typeof id !== "number") {
      alert("Incorrect ID found");
    } else {
      navigate(`/singleproduct/${id}`);
    }
  }


  return (
    <>
      <div className="group bg-white space-y-1 h-full hover:shadow-lg transition ease-in-out p-1 xl:p-2 text-center rounded-xl flex flex-col  relative overflow-hidden">
        <div
          onClick={() => redirectToProductPage(product.id)}
          className="w-full p-2 rounded-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          <img
            className="h-40 sm:h-56 md:h-56 xl:h-80 w-full rounded-xl object-cover transition-opacity duration-300"
            src={product.imageUrl[0]}
            alt={product.name}
          />
          {/* <button className="absolute text-white text-xs lg:text-lg rounded-full bottom-0 right-0 m-3 px-2 lg:px-3 py-1 bg-green-900">
            <i className="fa-solid fa-bag-shopping"></i>
          </button> */}
        </div>

        <div
          onClick={() => redirectToProductPage(product.id)}
          className="p-2 flex h-full flex-col justify-between"
        >
          <h2 className="text-sm md:text-md lg:text-xl font-medium">
            {product.name}
          </h2>
          <div>
            {}
            <p className=" py-2 text-xs md:text-md lg:text-xl ">
              {/* {product.discountprice} */}
              ₹ {product.sizes[0].discountPrice}
            </p>
            <div className="text-yellow-700 text-xs space-x-2">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
        </div>

        <div className=" flex lg:flex-row flex-col md:gap-3 xs:gap-2 gap-1 mb-5 justify-center w-full">
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
            className="border rounded-lg md:px-3 px-0 sm:py-2 py-1 sm:text-lg text-base md:font-semibold font-medium border-green-900 text-green-900 bg-transparent capitalize w-full"
          >
            Add to Cart
          </Button>
          <Button
            className=" border border-green-900 text-white rounded-lg  md:px-3 px-0 sm:py-2 py-1  sm:text-lg text-base sm:font-semibold
            font-medium bg-green-900 capitalize w-full"
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
}
