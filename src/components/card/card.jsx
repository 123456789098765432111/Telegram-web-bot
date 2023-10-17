import React, { useState } from 'react'
import Button from '../button/Button'
import "./card.css"
const Card = (props) => {
  const {course,onAddItem,onRemoveItem} = props
  const [count,setCount] = useState(0)
  const handeIncrement= ()=>{
    setCount(prev=>prev+1)
    onAddItem(course)
  }
  const handeDecrement= ()=>{
    setCount(prev=>prev-1)
    onRemoveItem(course)
  }
  return (
    <>
     <div className="card w-96 bg-base-100 shadow-xl">
      <span className={` ${count !== 0 ? 'card_badge':"card_badge-hidden"}`}>{count}</span>
     <figure style={{padding:"20px"}} className='img_1'>
       <img src={course.Image} alt={course.title} style={{borderRadius:"20px"}}/>
       </figure>
     <div className='card-body'>
  <div className='card_body_flex'>
          <h2 className="card-title">{course.title}</h2>
     <div>
           <p>{course.price.toLocaleString('en-Us',{
            style:'currency',
            currency:'USD'
           })}</p>
     </div>
          
  </div>
     </div>
           <div style={{paddingLeft:"30px",paddingRight:"30px"}}>
             <div className='hr' >
            
             </div>
           </div>
       <div className="card-footer btn_fotter" style={{display:"flex",gap:"10px",justifyContent:"center",alignItems:"center",padding:'30px'}}>
            
            <Button onClick={handeIncrement} type={'add'} title={'+'}    />
            {count !==0 &&(
            <Button type={'remove'} title={'-'}  onClick={handeDecrement}/>
            )}
       </div>
   </div>
    </>
  )
}

export default Card