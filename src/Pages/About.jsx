import React from 'react';

const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl">
          This is
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              Store
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Welcome to Store Project Site – your one-stop online destination for
        quality products, great deals, and a smooth shopping experience. We are
        committed to making your online shopping journey easy, secure, and
        enjoyable. At Store Project Site, we offer a wide range of products
        across categories like electronics, fashion, home essentials, personal
        care, and more – all just a click away. Our goal is to connect you with
        top brands and reliable sellers, backed by fast delivery, secure payment
        options, and friendly customer support. We believe in putting our
        customers first and providing a user-friendly platform that meets your
        needs with convenience and trust. Whether you're shopping for the latest
        gadgets, stylish clothing, or everyday essentials, Store Project Site
        has you covered. Thank you for choosing Store Project Site. Happy
        shopping!
      </p>
    </>
  );
};

export default About;
