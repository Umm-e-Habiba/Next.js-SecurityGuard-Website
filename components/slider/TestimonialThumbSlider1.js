'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import Slider from "react-slick"

const TestimonialThumbSlider1 = () => {
    const [slider1, setSlider1] = useState(null)
    const [currentSlide, setCurrentSlide] = useState(0)

    const totalSlides = 4 // Update if you change testimonial count

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        infinite: true,
        afterChange: (index) => setCurrentSlide(index),
    }

    return (
        <>
            <div className="testimonial-sliders">
                {/* Main Testimonial Slider */}
                <Slider
                    {...settingsMain}
                    ref={(slider) => setSlider1(slider)}
                    className="slider-testimonial"
                >
                    <div className="single-testimonial">
                        <h5>“We have used Metro Guards Security at Apex Property Management (APM) for the last 6 months. I can only describe their reception security as exceptional. They manage the front of hour in a number of our residential apartment blocks across Melbourne. The management are always on hand to support Apex and are extremely proactive. Due to the current pandemic, we have required additional staff at short notice, and they have been excellent in facilitating these requests. I would highly recommend Metro Guards and I look forward working with them. Thank you everyone at Metro Guards and keep up the great work." Positive Responsiveness, Quality, Professionalism, Value”</h5>
                        <div className="author">
                            <Link href="#">Stevon lyons</Link>
                            <p>Apex Property Management (APM)</p>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“I have used their security services multiple times. They are highly competent and a pleasure to work with! I would highly recommend their services. Christine M. Fox I have never seen such a friendly and understanding staff ever. It was my first experience hiring a security guards' team, and you guys made it splendid. You have cleared all the doubts popping up in my mind while hiring security services. Thanks a bunch for your superb security services! ”</h5>
                        <div className="author">
                            <Link href="#">Uzma Khan</Link>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“I have used their security services multiple times. They are highly competent and a pleasure to work with! I would highly recommend their services. ”</h5>
                        <div className="author">
                            <Link href="#">Christine M.Fox</Link>
                        </div>
                    </div>
                    <div className="single-testimonial">
                        <h5>“We have used Metro Guards Security at Apex Property Management (APM) for the last 6 months. I can only describe their reception security as exceptional. They manage the front of hour in a number of our residential apartment blocks across Melbourne. The management are always on hand to support Apex and are extremely proactive. Due to the current pandemic, we have required additional staff at short notice, and they have been excellent in facilitating these requests. I would highly recommend Metro Guards and I look forward working with them. Thank you everyone at Metro Guards and keep up the great work." Positive Responsiveness, Quality, Professionalism, Value”</h5>
                        <div className="author">
                            <Link href="#">Stevon lyons</Link>
                            <p>Apex Property Management</p>
                        </div>
                    </div>
                </Slider>

                {/* Bullet Navigation */}
                <div className="testimonial-bullets">
                    {[...Array(totalSlides)].map((_, index) => (
                        <span
                            key={index}
                            className={`bullet ${currentSlide === index ? 'active' : ''}`}
                            onClick={() => slider1?.slickGoTo(index)}
                        >
                            ●
                        </span>
                    ))}
                </div>
            </div>

            {/* Inline CSS (or move to your SCSS/CSS file) */}
            <style jsx>{`
                .testimonial-bullets {
                    text-align: center;
                    margin-top: 20px;
                }

                .bullet {
                    cursor: pointer;
                    font-size: 24px;
                    margin: 0 8px;
                    color: #ccc;
                    transition: color 0.3s ease;
                    user-select: none;
                }

                .bullet.active {
                    color: #000;
                }

                .single-testimonial {
                    padding: 20px;
                    text-align: center;
                }

                .author {
                    margin-top: 15px;
                }

                .author a {
                    font-weight: bold;
                    text-decoration: none;
                }

                .author p {
                    margin: 0;
                    font-style: italic;
                }
            `}</style>
        </>
    )
}

export default TestimonialThumbSlider1
