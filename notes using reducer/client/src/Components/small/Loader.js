import React, { useEffect, useState } from 'react'

export default function Loader() {
  const [dots, setDots] = useState(0);
  useEffect(()=>{
    setTimeout(()=>setDots(dots+1), 200);
  }, [dots])
  return (
    <div>   
      Loading {".".repeat(dots)}
    </div>
  )
}
