// import React, { useEffect, useState } from 'rea  ct';
import { useLoaderData } from 'react-router-dom';

function Github() {
    const data = useLoaderData();
    // const [data, setData] = useState([]);
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/junaidamin128')
    //     .then(response=>response.json())
    //     .then(data =>{
    //         console.log(data);
    //         setData(data);
    //     })
    // },[])
  return (
    <div>
        <img src = {data.avatar_url} alt='github_image' width={300} />
      <h1>Github Followers: {data.followers} </h1>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async ()=>{
   return (await fetch('https://api.github.com/users/junaidamin128')).json();
    
}
