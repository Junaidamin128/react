import React, { useRef, useState } from 'react';
import Circle from "../Circle/Circle"
import './Work.scss';

const workCategories = ['All Works', 'Fixes', 'Personal Projects', 'APIs'];

const workData = [
    {
        title: '360 Training',
        image: require('../../Assets/Images/360training.png'),
        href: 'https://www.360training.com/',
        category: 'Fixes',
        class: 'first',
    },
    {
        title: 'Our Better World',
        image: require('../../Assets/Images/ourbetterworld.png'),
        href: 'https://www.ourbetterworld.org/',
        category: 'Fixes'
    },
    {
        title: 'Notes App',
        image: require('../../Assets/Images/NOTES.png'),
        technologies: ["MongoDB", "Express", "React", "Node.js"],
        Role: "FullStack Developer",
        category: 'Personal Projects'
    },
    {
        title: 'User Authentication',
        image: require('../../Assets/Images/user-authentication.png'),
        technologies: ["MongoDB", "Express", "React", "Node.js"],
        role: "FullStack Developer",
        category: 'Personal Projects'
    },
    {
        title: 'Wallpaper API',
        image: require('../../Assets/Images/API.png'),
        technologies: ['Drupal', 'PHP'],
        role: "Backend Developer",
        category: 'APIs'
    },
    {
        title: '95visual',
        image: require('../../Assets/Images/95visual.png'),
        href: 'https://www.95visual.com/',
        category: 'Fixes'
    },
    {
        title: 'iatse728',
        image: require('../../Assets/Images/iatse728.png'),
        href: 'https://www.iatse728.org/',
        category: 'Fixes'
    },
];

function Work() {
    const [selectedCategory, setSelectedCategory] = React.useState('All Works');
    const [mousePositions, setMousePositions] = useState(
        workData.map(() => ({ x: 0, y: 0 }))
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

    const filteredWorks = selectedCategory === 'All Works'
        ? workData
        : workData.filter(work => work.category === selectedCategory);

    return (
        <>
            <div className="container">
                <div className="work-header">
                    <h3 className='sub-heading'>Cool Stuffs</h3>
                    <div className="work-categories">
                        {workCategories.map((category, index) => (
                            <span
                                key={index}
                                className={selectedCategory === category ? 'active' : ''}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="work-gallery">
                    {filteredWorks.map((work, index) => (
                        <div key={index} className={`work-item ${work.class? work.class: ''}`} ref={(el) => (divRefs.current[index] = el)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}>
                            <div className='item-front'>
                                <img src={work.image} alt={work.title} />
                                <h2>{work.title}</h2>
                            </div>
                            <div className='item-back'>
                                <h2>{work.title}</h2>
                                {work.description ? <p>{work.description}</p> : ''}
                                {work.technologies ? <ul>
                                    {work.technologies.map((e, index) => {
                                        return <li key={index}>{e}</li>
                                    })}
                                </ul> : ''}
                                {work.role ? <p><span>Role:</span>{work.role}</p> : ''}
                                {work.href ? <a href={work.href}>{work.title}</a> : ''}
                            </div>
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
        </>
    );
}

export default Work;
