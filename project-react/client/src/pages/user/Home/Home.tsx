import React, { useState } from 'react';
import Header from '../../../components/user/Header';
import Footer from '../../../components/user/Footer';
import './home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/1.png?alt=media&token=ffcc70fa-45c7-4241-b9fe-dbf72388335e",
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/2.png?alt=media&token=89696a97-a474-4d5f-b5b4-6145dbf5e53e",
    "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/3.png?alt=media&token=d339e2c9-497c-4474-a993-2e27ab02082c"
  ];

  const features = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/feature1-removebg-preview.png?alt=media&token=3f026415-d231-495d-8c18-f6cd7465bd77",
      title: "Đề Thi Tiểu Học",
      description: "Ngân hàng câu hỏi đầy đủ các môn cấp 1 được trộn tạo đề theo cấu trúc phân loại giúp các em dễ dàng ôn tập online đề thi giữa học kỳ, thi học kỳ theo các chủ đề đã học."
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/feature2-removebg-preview.png?alt=media&token=0b6ed2bb-7d88-4cf6-9091-1cf224bb5802",
      title: "Đề Thi THCS",
      description: "Ngân hàng câu hỏi đầy đủ các môn cấp 2 được trộn tạo đề theo cấu trúc phân loại giúp các em dễ dàng ôn tập online đề thi giữa học kỳ, thi học kỳ theo các chủ đề đã học."
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/feature3-removebg-preview.png?alt=media&token=a50745cb-58cd-478a-89a4-ae3d096d09cb",
      title: "Đề Thi THPT",
      description: "Ngân hàng câu hỏi đầy đủ các môn cấp 3 được trộn tạo đề theo cấu trúc phân loại giúp các em dễ dàng ôn tập online đề thi giữa học kỳ, thi học kỳ theo các chủ đề đã học."
    },
  ];

  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setFade(false);
    }, 1000);
  };

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      setFade(false);
    }, 1000);
  };

  return (
    <div>
      <Header />
      <div className="slider">
        <div className="image-container">
          <img
            className={`slider-image ${fade ? 'fade-out' : 'fade-in'}`}
            width="800px"
            src={images[currentIndex]}
            alt="slider"
          />
          <div className="icon-slider">
            <button onClick={handlePrev} className="slider-button" aria-label="Previous">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={handleNext} className="slider-button" aria-label="Next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      <h1 className="main-title">Trắc Nghiệm Thi Online</h1>
      <h2 className="sub-title">Đa Dạng - Thông Minh - Chính Xác</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <Link to="">
            <div key={index} className="feature">
              <img width="150px" src={feature.img} alt={feature.title} />
              <div className="feature-title">{feature.title}</div>
              <div className="feature-description">{feature.description}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="smart-section">
        <h1 className="smart-title text-4xl text-center mb-8">Trắc Nghiệm Thông Minh</h1>
        <div className="smart-images flex justify-center items-center gap-8">
          <div className='w-[300px] flex flex-col justify-center items-center'>
            <div className="bg-green-400 w-32 h-32 flex items-center justify-center rounded-full">
              <img src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/smart1.png?alt=media&token=2c63d5a6-1ef2-4f6f-b85c-a4feb80e8abf" alt="Smart Test 1" className="w-24 h-24" />
            </div>
            <h1 className='text-[25px]'>Đa Dạng Nội Dung</h1>
            <p>Cung cấp đa dạng nội dung các câu hỏi trắc nghiệm thuộc nhiều lĩnh vực khác nhau</p>
          </div>
          <div className='bg-green-400 w-[100px] h-[5px]'></div>
          <div className='w-[300px] flex flex-col justify-center items-center'>
            <div className="bg-green-400 w-32 h-32 flex items-center justify-center rounded-full">
            </div>
            <h1 className='text-[25px]'>Ma trận câu hỏi</h1>
            <p>Hệ thống sẽ dựa vào ma trận câu hỏi phong phú để tự tổng hợp thành đề trắc nghiệm</p>
          </div>
          <div className='bg-green-400 w-[100px] h-[5px]'></div>
          <div className='w-[300px] flex flex-col justify-center items-center'>
            <div className="bg-green-400 w-32 h-32 flex items-center justify-center rounded-full">
              <img src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/smart3.png?alt=media&token=fdd173ef-eabb-4042-858e-3b7cdd04b304" alt="Smart Test 3" className="w-24 h-24" />
            </div>
            <h1 className='text-[25px]'>Đáp án chi tiết</h1>
            <p>Sau khi hoàn thành bài kiểm tra trắc nghiệm hệ thống sẽ thông báo số điểm đạt được kèm lời giải chi tiết</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
