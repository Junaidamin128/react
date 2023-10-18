import axios from "axios";

export const loadNotes = async (dispatch) => {
    console.log("USING hi");

    let token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
        dispatch(null);
        return;
    }
    let res = await axios.get("http://localhost:3345/note", {
        headers: {
            Authorization: `bearer ${token}`
        }
    })
    console.log(res.data);

    dispatch({ type: "SET_NOTES", notes: res.data });
}

export const deleteNote = async (id, dispatch) => {
    //////
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
        dispatch({ type: "DELETE_NOTE", id });
        // loadNotes();
        // setSelectedNote(null);
    } catch (err) {
        console.log(err)
    }
}