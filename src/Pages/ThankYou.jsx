import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function Thankyou() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirects to home page after 3 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
       
        <IoIosCheckmarkCircleOutline  className="text-green-500 lg:text-9xl  sm:text-4xl text-2xl mx-auto font-extrabold" />
        <h2 className="lg:text-5xl  sm:text-3xl text-xl font-bold text-[#474747] mt-3 mb-2">Thank You!</h2>
        <p className="text-gray-600 mt-2 text-base">
          Your order has been placed successfully at Organic Matki.
        </p>
        <p className="text-gray-500 mt-2 text-base">
          You will be redirected to the home page in 5 seconds...
        </p>
      </div>
    </div>
  );
}
