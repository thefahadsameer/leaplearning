// src/components/Homepage/Testimonials/Testimonials.jsx

import "./Testimonials.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

function Testimonials() {
  const reviews = [
    {
      name: "Julius Mills",
      role: "Business Professional, UK",
      text: "Leap Learning helped me understand the right DBA pathway clearly. Their guidance was professional and smooth.",
    },
    {
      name: "Siti Zulaikha",
      role: "Senior Project Manager, Kota Kinabalu, Malaysia",
      text: "The support team was responsive and professional throughout. I highly recommend Leap Learning to working professionals seeking academic advancement.",
    },
    {
      name: "Ahmed Kareem",
      role: "Entrepreneur, UAE",
      text: "The support team was responsive and transparent throughout the process. Highly recommended for busy professionals.",
    },
    {
      name: "Grace Mensah",
      role: "Senior Manager, Africa",
      text: "I appreciated the structured communication and premium level assistance from start to finish.",
    },
    {
      name: "James Wilson",
      role: "Operations Manager, London, UK",
      text: "Leap Learning provided exceptional guidance throughout my DBA journey. The process was well-structured, professional, and easy to follow.",
    },
    {
      name: "Emily Carter",
      role: "Marketing Director, Chicago, USA",
      text: "The team was incredibly responsive and kept me informed at every stage. I appreciated their commitment to delivering a premium experience.",
    },
    {
      name: "Muhammad Rizky",
      role: "Business Development Manager, Jakarta, Indonesia",
      text: "Leap Learning provided excellent support and clear guidance throughout the process. Their professionalism made everything smooth and efficient.",
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-badge">Client Success</span>

          <h2>
            Trusted By Ambitious <br />
            Professionals Worldwide
          </h2>

          <p>
            Real experiences from individuals who chose Leap Learning for
            growth, recognition, and guidance.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-slider"
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <div className="quote-mark">“</div>

                <p className="testimonial-text">{item.text}</p>

                <h3>{item.name}</h3>

                <span>{item.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;