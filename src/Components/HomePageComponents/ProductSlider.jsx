import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Products from "./NewProductsCard";
import axiosInstance from "../../utils/axios";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchProducts = async (index) => {
    try {
      const response = await axiosInstance.get(`/shop?page=${index}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setSlidesPerView(4);
      } else if (window.innerWidth >= 640) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.activeIndex);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full overflow-hidden p-2 lg:p-4">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView="auto"
        // {slidesPerView}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds (e.g., 3000ms = 3s)
          disableOnInteraction: false, // Autoplay won't be disabled after user interaction
        }}
        onSlideChange={handleSlideChange}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active bg-green-900",
          bulletClass: "swiper-pagination-bullet bg-yellow-700",
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 mx-1 rounded-full cursor-pointer"></span>`;
          },
        }}
        className="pb-12"
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <Products product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
        <button className="swiper-button-prev bg-yellow-700 text-white w-12 h-12 rounded-full flex justify-center items-center">
          <IoMdArrowDropleft className="w-10 h-10" />
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
        <button className="swiper-button-next bg-yellow-700 text-white w-12 h-12 rounded-full flex justify-center items-center">
          <IoMdArrowDropright className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default ProductSlider;
