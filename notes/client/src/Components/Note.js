import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Note({ note, loadNote }) {
    const [isUpdate, setIsUpdate] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();



    const handleSubmit = async (evt) => {
        evt.preventDefault();
        let token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            let res = await axios.put(`http://localhost:3345/note/update/${id}`, {
                title: title,
                content: content
            }, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            setError(res?.data.msg)
            await loadNote(note._id);
            setIsUpdate(false)

        } catch (err) {
            if (err.response?.data) {
                let data = err.response.data;
                if (data.name && data.name === 'unsuccess') {
                    setError(data.msg)
                }
                if (data.name && data.name === 'notauth') {
                    setError(data.msg)
                }
            }

        }


    }
    const deleteNote = async (id) => {
        let token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        try {
            await axios.delete(`http://localhost:3345/note/delete/${id}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            navigate("/");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>

            <div className="card m-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <div className='buttons d-flex justify-content-between'>
                        <div>

                            <button type="button" className="btn btn-primary mx-2" onClick={() => { setIsUpdate(true); setTitle(note.title); setContent(note.content)}}>
                                Edit
                            </button>
                            <button type="button" className="btn btn-danger mx-2" data-bs-toggle="modal" data-bs-target="#deleteNote" >
                                Remove
                            </button>
                        </div>
                        <div>
                            <button className='btn btn-primary' onClick={()=>{navigate("/")}} >Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
            {error}
            {isUpdate ? <form className='my-2' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(evt) => { setTitle(evt.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Detail</label>
                    <textarea className="form-control" id="content" rows="8" value={content} onChange={(evt) => { setContent(evt.target.value) }} />
                </div>
                <button type="submit" className="btn btn-primary mx-2  ">Update Note</button>
                <button type="submit" className="btn btn-primary mx-2  " onClick={() => { setIsUpdate(false);setTitle("");setContent("") }}>Close</button>
            </form> : ""}
            <div className="modal fade" id="deleteNote" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{note.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Do you really want to delete <strong>{note.title}</strong></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger" onClick={() => { deleteNote(note._id) }} data-bs-dismiss="modal">Delete Note</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Note



