import React from 'react'

const SubImages = (props) => {
  return (
    <div style={{width: "95px", height: "30px", display: "flex", overflow: "hidden"}}>
      <img style={{height: "100%", width: "50%", objectFit: "cover", display: "flex", justifyContent: "center", alignItems: "center", padding: "3px"}} src={props.image} alt="" />
    </div>
  )
}

export default SubImages;