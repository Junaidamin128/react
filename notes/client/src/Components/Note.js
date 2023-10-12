import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Note({note}) {
    const { id } = useParams();
    // const [note, setNote] = useState(null);
    // useEffect(() => {
    //     noteLoad();
    // }, [])


    // const noteLoad = async () => {
    //     try {
    //         let res = await axios.get(`http://localhost:3345/note/${id}`);
    //         setNote(res.data);
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }


    return (
        <>
            <div className="card m-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editNote">
                        Edit
                    </button>
                    <div className="modal fade" id="editNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{note.title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    Do you really want to delete {note.title}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-danger">Delete Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Note



