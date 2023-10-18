let notes = [];
let user = [];

function noteReducer(state, payload)
{
    if(payload.action == "delete")
    {
        //delete 
        return state;
    }
    if(payload.action == "add")
    {
        //add   
        return state;
    }

    return state;
}

function userReducer(state, payload)
{
    // asdfasdfa
}



const store = createStore(combineReducer(userReducer, noteReducer));
store.dispatch({action: "delete", id: 3});
store.add({action: "add", title: "hahsdkf"});