import React, { useEffect, useState, useRef } from 'react';
import heroImage from '../../Assets/Images/ussama-azam-U1LNi90EKAE-unsplash.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Home.scss';
import Circle from '../Circle/Circle';

function Home() {
  const [animateName, setAnimateName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    setAnimateName(true);
  }, []);

  const handleAnimationEnd = () => {
    setShowTitle(true);
  };

  const handleMouseMove = (e) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className='container'>
        <div className='home-main row align-items-center'>
          <div className='home-detail col-md-12 col-lg-7'>
            <h3 className='sub-heading'>Get Every Single Solution</h3>
            <h1 className='heading'>
              Hey! I am a <br />
              <span
                className={`heading-name ${animateName ? 'animate' : ''}`}
                onAnimationEnd={handleAnimationEnd}
                style={{ display: showTitle ? 'none' : 'inline-block' }}
              >
                Junaid
              </span>
              <span
                className={`heading-tile ${showTitle ? 'animate' : ''}`}
                style={{ display: showTitle ? 'inline-block' : 'none' }}
              >
                Web Developer
              </span>
            </h1>
            <p className='detail'>
            I'm a passionate web developer eager to create innovative and user-friendly digital experiences.
            </p>
          </div>
          <div
            className='home-media col-md-12 col-lg-5 text-center '
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <LazyLoadImage
              className='w-100 text-center'
              src={heroImage}
              alt="Profile"
              effect="blur"
            />
            {isHovered && <Circle mousePosition={mousePosition} containerRef={divRef} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
