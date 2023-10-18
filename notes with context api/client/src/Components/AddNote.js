import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let token = localStorage.getItem("token");
        try {
            await axios.post("http://localhost:3345/note/create", {
                title: title,
                content: content
            } , {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })

        } catch (err) {
            if (err.response?.data) {
                let data = err.response.data;
                setError("");
                if (data.name && data.name === 'form') {
                    setError(data.msg);
                }
            }
        }
        
        navigate("/");
    }

    return (
        <>
            <h1>Add New Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(evt) => { setTitle(evt.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Detail</label>
                    <textarea className="form-control" id="content" rows="15" value={content} onChange={(evt) => { setContent(evt.target.value) }} />
                </div>
                {error}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AddNote
