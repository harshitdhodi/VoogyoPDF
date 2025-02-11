"use client"

import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import img1 from "../images/t1.jpg"
import img2 from "../images/t2.jpg"

const testimonials = [
  {
    quote: "Voogyo has completely transformed the way I plan my trips. It's like having a personal travel assistant!",
    author: "Sarah L.",
    title: "Adventure Enthusiast",
    rating: 5,
    image: img1,
  },
  {
    quote: "The real-time updates feature saved me from missing my flight. Voogyo is a must-have for any traveler.",
    author: "Mike R.",
    title: "Business Traveler",
    rating: 5,
    image: img2,
  },
  {
    quote: "I love how easy it is to track my travel expenses with Voogyo. It's helped me stay on budget during my trips.",
    author: "Emily T.",
    title: "Budget Traveler",
    rating: 5,
    image: img1,
  },
  {
    quote: "Voogyo's customer support is top-notch. They helped me with all my travel queries promptly.",
    author: "John D.",
    title: "Frequent Flyer",
    rating: 5,
    image: img2,
  },
  {
    quote: "The itinerary planning feature is fantastic. It made my trip so much more organized and enjoyable.",
    author: "Anna K.",
    title: "Solo Traveler",
    rating: 5,
    image: img1,
  },
  {
    quote: "Voogyo offers great deals on flights and hotels. I've saved a lot of money using their platform.",
    author: "David M.",
    title: "Budget Traveler",
    rating: 5,
    image: img2,
  },
]

export default function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Enable auto slide
    autoplaySpeed: 3000, // Set the speed for each slide (in milliseconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section id="testimonials" className="review py-20 bg-[#c2e6f2]">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">What Our Travelers Say</h2>
        </div>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="text-gray-900 font-semibold">{testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
