import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import EventSection from "./EventSection";
//import Favourites from "./Favourites";
import EventFilterBar from "./EventFilterBar";
import { API_BASE_URL } from "../../config";
import "../css/Banner.css"

// 🏠 HOMEPAGE (2 BANNER, KHÔNG CATEGORY)
function HomePage({ searchTerm, favorites = [], toggleFavorite = () => {} }) {
  const [bannerIndex1, setBannerIndex1] = useState(0);
  const [bannerIndex2, setBannerIndex2] = useState(0);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortOption, setSortOption] = useState("");

  // 🟢 FETCH EVENTS từ backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🟢 2 Banner auto chuyển riêng biệt
  useEffect(() => {
    if (events.length === 0) return;

    const interval1 = setInterval(() => {
      setBannerIndex1((prev) => (prev + 1) % events.length);
    }, 5000);

    const interval2 = setInterval(() => {
      setBannerIndex2((prev) => (prev + 1) % events.length);
    }, 6000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [events.length]);

  const nextBanner1 = () => {
    if (events.length === 0) return;
    setBannerIndex1((prev) => (prev + 1) % events.length);
  };

  const prevBanner1 = () => {
    if (events.length === 0) return;
    setBannerIndex1((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const selectBanner1 = (index) => setBannerIndex1(index);

  const nextBanner2 = () => {
    if (events.length === 0) return;
    setBannerIndex2((prev) => (prev + 1) % events.length);
  };

  const prevBanner2 = () => {
    if (events.length === 0) return;
    setBannerIndex2((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const selectBanner2 = (index) => setBannerIndex2(index);

  const handleSortChange = (sort) => setSortOption(sort);

  useEffect(() => {
    let result = [...events];

    // Tìm kiếm theo tên hoặc mô tả
    if (searchTerm) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sắp xếp theo tùy chọn sort
    if (sortOption === "date_asc") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "date_desc") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredEvents(result);
  }, [events, searchTerm, sortOption]);

  return (
    <>
      {/* 🖼 2 BANNER SONG SONG */}
      <div className="banner-container">
        <Banner
          bannerIndex={bannerIndex1}
          nextBanner={nextBanner1}
          prevBanner={prevBanner1}
          selectBanner={selectBanner1}
        />

        <Banner
          bannerIndex={bannerIndex2}
          nextBanner={nextBanner2}
          prevBanner={prevBanner2}
          selectBanner={selectBanner2}
        />
      </div>

      {/* 🎛 Thanh lọc & sắp xếp */}
      <EventFilterBar onSortChange={handleSortChange} sortOption={sortOption} />

      <section className="homepage-intro">
        <div className="homepage-text">
          <h1>TicketNow</h1>
          <p>Đặt vé sự kiện nhanh chóng, dễ dàng và an toàn. Khám phá sự kiện nổi bật trong thành phố ngay hôm nay.</p>
        </div>
      </section>

      <EventSection
        title={searchTerm ? "Kết quả tìm kiếm" : "Sự kiện nổi bật"}
        events={searchTerm ? filteredEvents : events}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </>
  );
}

export default HomePage;