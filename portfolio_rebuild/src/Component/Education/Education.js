import React from 'react';
import './Education.css';

function Education() {
    const educationData = [
        {
            institution: 'Humble Mimbo School & College',
            duration: '2010-2014',
            degree: 'Higher Secondary Certificate',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
        },
        {
            institution: 'Humble Mimbo School & College',
            duration: '2010-2014',
            degree: 'Computer Science',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
        },
        {
            institution: 'Humble Mimbo School & College',
            duration: '2010-2014',
            degree: 'Computer Science',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
        }
    ];

    return (
        <>
                <div className="container">
            <h3>My Qualification</h3>
            <h1>Education</h1>
            <div className="education-container">
                {educationData.map((edu, index) => (
                    <div key={index} className="education-item">
                        <span className="dot"></span>
                        <div className="education-content">
                            <p className="institution">
                                {edu.institution} <span className="duration">({edu.duration})</span>
                            </p>
                            <h2 className="degree">{edu.degree}</h2>
                            <p className="description">{edu.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}

export default Education;
