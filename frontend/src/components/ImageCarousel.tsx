import  { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageCarousel = ({ images } : any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Function to navigate to a specific image via dots
  const goToSlide = (index : any) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Image Container */}
      <div className="relative">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-64 object-contain rounded-lg"
        />

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center items-center mt-4">
        {images.map((_ : any, index : any) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer w-3 h-3 mx-1 rounded-full ${
              index === currentIndex
                ? "bg-blue-500 w-3 h-3 transition-all duration-300"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
