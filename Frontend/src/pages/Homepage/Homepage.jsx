import React, { useState } from 'react';
import Footer from '../footer/Footer';
import ReviewCard from '../../Components/ReviewCard/ReviewCard';
import Modal from '../../Components/Modal/Modal'; // Import Modal component
import './Homepage.css';
import backgroundVideo from '../../assets/homebg.mp4';
import hanoiImage from '../../assets/hanoi.jpg';
import danangImage from '../../assets/danang1.jpg';

const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const reviews = [
    {
      hotelName: 'Klausturhof Guesthouse',
      location: 'in Iceland',
      review: 'I could not have asked for a better stay than Klausturhof. Thanks to The Travel.',
      reviewer: 'Vishwas from India'
    },
    {
      hotelName: 'Fairmont Singapore',
      location: 'in Singapore',
      review: 'The hotel was simple amazing and I couldn\'t thank The Travel. more for helping out.',
      reviewer: 'Malvin from Singapore'
    },
    {
      hotelName: 'Baiyoke Suite Hotel',
      location: 'in Thailand',
      review: 'I will keep on recommending The Travel. to my friends.',
      reviewer: 'Amit from India'
    }
  ];

  const hanoiDetails = (
    <>
      <h2>Ha Noi</h2>
      <p>
        Ha Noi, the capital city of Vietnam, is known for its centuries-old architecture and rich culture 
        with Southeast Asian, Chinese, and French influences. The city’s central area, Hoan Kiem District, 
        is known for its bustling streets, vibrant markets, and the iconic Hoàn Kiếm Lake.
      </p>
      <ul>
        <li><strong>Hoan Kiem Lake:</strong> A serene lake in the heart of the city, surrounded by legends and beautiful views.</li>
        <li><strong>Old Quarter:</strong> Famous for its preserved colonial architecture, narrow streets, and traditional markets.</li>
        <li><strong>Temple of Literature:</strong> Vietnam's first university, dedicated to Confucius, scholars, and sages.</li>
      </ul>
      <p>Hà Nội is a city that beautifully balances modern life with its historical past.</p>
    </>
  );

  const danangDetails = (
    <>
      <h2>Da Nang</h2>
      <p>
        Da Nang is a coastal city in central Vietnam known for its sandy beaches and history as a French colonial port. 
        The city is surrounded by beautiful landscapes including the famous Marble Mountains and the Golden Bridge.
      </p>
      <ul>
        <li><strong>Golden Bridge:</strong> A stunning pedestrian bridge held up by giant stone hands, offering panoramic views of the Ba Na Hills.</li>
        <li><strong>My Khe Beach:</strong> Known as one of the most beautiful beaches in Vietnam, perfect for sunbathing and water sports.</li>
        <li><strong>Marble Mountains:</strong> A cluster of five marble and limestone hills, known for its caves, tunnels, and Buddhist sanctuaries.</li>
      </ul>
      <p>Da Nang is an ideal destination for both adventure seekers and those looking to relax by the beach.</p>
    </>
  );

  const handleCardClick = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      <main className="main-content">
        <section className="hero-section fade-in">
          <video className="hero-video" autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <div className="hero-overlay">
            <h1>Welcome to The Travel</h1>
            <p>Discover the best destinations around the world.</p>
          </div>
        </section>

        <section className="suggested-places fade-in fade-in-delay-1">
          <h2>Suggested Places</h2>
          <div className="places-grid">
            <div className="place-card" onClick={() => handleCardClick(hanoiDetails)}>
              <img src={hanoiImage} alt="Hà Nội" />
              <h3>Ha Noi</h3>
              <p>Experience the vibrant culture and rich history of Vietnam's capital city.</p>
            </div>
            <div className="place-card" onClick={() => handleCardClick(danangDetails)}>
              <img src={danangImage} alt="Đà Nẵng" />
              <h3>Đa Nang</h3>
              <p>Enjoy the beautiful beaches and delicious cuisine in this coastal city.</p>
            </div>
          </div>
        </section>

        <section className="reviews-section fade-in fade-in-delay-2">
          <h2>Overheard from travelers</h2>
          <div className="reviews-grid">
            {reviews.map((review, index) => (
              <ReviewCard
                key={index}
                hotelName={review.hotelName}
                location={review.location}
                review={review.review}
                reviewer={review.reviewer}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} content={modalContent} />
    </div>
  );
};

export default Homepage;
