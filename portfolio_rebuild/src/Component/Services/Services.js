import React, { useRef, useState } from 'react';
import servicesData from './ServicesData';
import Circle from '../Circle/Circle';
import './Services.scss';

function Services() {
    const [mousePositions, setMousePositions] = useState(
        servicesData.map(() => ({ x: 0, y: 0 }))
    );
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const divRefs = useRef([]);

    const handleMouseMove = (e, index) => {
        if (divRefs.current[index]) {
            const rect = divRefs.current[index].getBoundingClientRect();
            const newMousePositions = [...mousePositions];
            newMousePositions[index] = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
            setMousePositions(newMousePositions);
        }
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    return (
        <div className='container'>
            <div className='services-main'>
                <h3 className="sub-heading">Services</h3>
                <div className='sevices-card-wrapper'>
                    {servicesData.map((service, index) => (
                        <div
                            className="service-card"
                            ref={(el) => (divRefs.current[index] = el)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            key={index}
                        >
                            <img src={service.image} alt={service.title} className="service-image" />
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-keypoints">
                                {service.keyPoints.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                            {hoveredIndex === index && (
                                <Circle
                                    mousePosition={mousePositions[index]}
                                    containerRef={divRefs.current[index]}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Services;
