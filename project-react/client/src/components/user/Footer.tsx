import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <div className='bg-blue-300'>
            <div>
                <img className='m-auto' width="250px" src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Online_Academy-removebg-preview.png?alt=media&token=baa36f34-e6af-4771-b020-f383fb840ba5" alt="" />
            </div>
            <hr className='border-dashed border-2 border-white w-[70%] m-auto mt-[20px]'/>
            <div className='flex justify-center items-center gap-[130px] mt-[50px]'>
                <div className='flex flex-col'>
                   <Link className='text-yellow-300' to="">Đề thi tiểu học</Link> 
                   <Link to="">Toán</Link> 
                   <Link to="">Văn</Link> 
                   <Link to="">Anh</Link> 
                </div>
                <div className='flex flex-col'>
                    <Link className='text-yellow-300' to="">Đề thi THCS</Link>
                    <Link to="">Toán</Link>
                    <Link to="">Lý</Link>
                    <Link to="">Hoá</Link>
                </div>
                <div className='flex flex-col'>
                    <Link className='text-yellow-300' to="">Đề Thi THPT</Link>
                    <Link to="">Toán</Link>
                    <Link to="">Lý</Link>
                    <Link to="">Hoá</Link>
                </div>
            </div>
            <hr className='border-dashed border-2 border-white w-[70%] m-auto mt-[20px]'/>
            <div className='flex justify-center items-center gap-[300px] mt-[50px]'>
                <div>
                    <h2 className='text-[20px]'>Người Làm Nội Dung</h2>
                    <p>Nguyễn Gia Thiều</p>
                </div>
                <div>
                    <h2 className='text-[20px]'>Liên Hệ</h2>
                    <p>Địa Chỉ: Đanh Trại - Yên Thọ - Ý Yên - Nam Định</p>
                    <p>Email: nguyenthieu11021995@gmail.com</p>
                    <p>Số Điện Thoại: 0355483082</p>
                </div>
            </div>
            <div className='text-center'>Copyright © 2022 by Thiều</div>
        </div>
    </>
  )
}
