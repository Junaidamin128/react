import React, { useEffect, useRef, useState } from 'react';
import './Skills.scss';
import resume from '../../Assets/Resume.pdf';


const SkillsData = [
    { skill: 'HTML', percentage: 85 },
    { skill: 'CSS', percentage: 80 },
    { skill: 'SASS', percentage: 80 },
    { skill: 'JavaScript', percentage: 60 },
    { skill: 'PHP', percentage: 60 },
    { skill: 'MERN Stack', percentage: 50 },
    { skill: 'Drupal', percentage: 85 },
    { skill: 'MySQL', percentage: 60 }
];

const downloadCV = () => {
    const link = document.createElement('a');
    link.href = resume;
    link.download = 'Junaid_Amin_CV.pdf';
    link.click();
  };

function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const skillsRef = useRef(null);
    const [counters, setCounters] = useState(Array(SkillsData.length).fill(0));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (skillsRef.current) {
            observer.observe(skillsRef.current);
        }

        return () => {
            if (skillsRef.current) {
                observer.unobserve(skillsRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            SkillsData.forEach((skill, index) => {
                let start = 0;
                const end = skill.percentage;
                const duration = 1000; // Animation duration in milliseconds
                const increment = end / duration * 10;

                const counterInterval = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        start = end;
                        clearInterval(counterInterval);
                    }
                    setCounters((prevCounters) => {
                        const newCounters = [...prevCounters];
                        newCounters[index] = Math.floor(start);
                        return newCounters;
                    });
                }, 10);
            });
        }
    }, [isVisible]);



    return (
        <div className='container'>
            <div className='skills-main row' ref={skillsRef}>
                <div className='col-md-12 col-lg-6'>
                    <h3 className='sub-heading'>
                        Hi, Here My Short Information.
                    </h3>
                    <h1 className='heading'>
                        Passionate Development, Transforming Ideas into Digital Reality.
                    </h1>
                    <p>
                    Hi, I'm a Drupal web developer at Codeetechs. I have been with the company for the past two years, starting as an intern, then getting promoted to frontend developer, and later to full-stack Drupal developer.
                    </p>
                    <p>
                    During my time at Codeetechs, I have learned various technologies to a proficient level. I am always eager to learn new skills and upskill myself.
                    </p>
                    <button className='btn btn-custom' onClick={downloadCV}>Download CV</button>

                </div>
                <div className='skill-detail col-md-12 col-lg-6'>
                    <h3 className='sub-heading'>Skills</h3>
                    <ul className='skills-list'>
                        {SkillsData.map((skill, index) => (
                            <li key={index} className='skill-item'>
                                <div className='skill-name'>{skill.skill}</div>
                                <div className='progress-bar'>
                                    <div
                                        className='progress'
                                        style={{
                                            width: isVisible ? `${skill.percentage}%` : '0%',
                                            transition: 'width 1s ease'
                                        }}
                                    >
                                        <span className='progress-text'>
                                            {counters[index]}%
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Skills;
