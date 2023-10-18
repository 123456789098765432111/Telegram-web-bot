import React, { useCallback, useEffect, useState } from 'react'
import Card from './components/card/card'
import Cart from './components/cart/Cart'
import { getData } from './constans/db'
const courses = getData()
const telegram = window.Telegram.WebApp;
const App = () => {
  const [cartItems,setCartItems] = useState([])
  useEffect(()=>{
    telegram.ready()
  })
  const onAddItem = (item)=>{
    const existItem = cartItems.find(c=>c.id===item.id)
    if (existItem) {
      const data = cartItems.map(c=>c.id===item.id ?{...existItem,quantity:existItem.quantity+1}:c)
      setCartItems(data)
      
    }else{
      const newData =[...cartItems,{...item,quantity:1}]
      setCartItems(newData)
    }
  }
  const onRemoveItem =(item)=>{
    const existItem = cartItems.find(c=>c.id===item.id)
    if (existItem.quantity ===1) {
        const newData = cartItems.filter(c=>c.id!==existItem.id)
        setCartItems(newData)
    }else{
      const newData = cartItems.map(c=>c.id===existItem.id ? {...existItem,quantity:existItem.quantity-1}:c)
      setCartItems(newData)
    }
  }
  const onChecKout =()=>{
    telegram.MainButton.text ='Sotib olish';
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
		const queryID = telegram.initDataUnsafe?.query_id;

		if (queryID) {
			fetch(
				'https://telegramwebapibot-b671371abfbb.herokuapp.com/web-data',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						products: cartItems,
						queryID: queryID,
					}),
				}
			);
		} else {
			telegram.sendData(JSON.stringify(cartItems));
		}
	}, [cartItems]);

	useEffect(() => {
		telegram.onEvent('mainButtonClicked', onSendData);

		return () => telegram.offEvent('mainButtonClicked', onSendData);
	}, [onSendData]);

  return (
    <>
    <h1 style={{textAlign:"center",fontSize:"30px"}}>Umidjon kurslari</h1>
      <Cart cartItems={cartItems} onChecKout={onChecKout}/>
    <div className='cards_container '>
      {
        courses.map((course=>
          <Card key={course.id} course={course} onAddItem={onAddItem}  onRemoveItem={onRemoveItem}/>
        ))
      }
    </div>
    </>
  )
}

export default App