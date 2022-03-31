import React, { useState, useEffect } from 'react';
import { database } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [meals, setMeals] = useState([])
  const mealsRef = collection(database, 'meals')
  
  useEffect(() => {
    const getMeals = async () => {
      const data = await getDocs(mealsRef)
      // console.log(data)
      setMeals(data.docs.map(doc => {
        return {
          ...doc.data(), 
          id: doc.id
        };
      }))
      console.log(meals);
    }
    getMeals()
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-9'>
          <h1>Foods Near You.</h1>
          <div className='row'>
            {
              meals.map(meal => {
                return (
                  <div className='col-3'>
                    <div className="card" style={{width: '18rem'}}>
                      <img src={meal.image_src} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{meal.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{meal.store}</h6>
                        <p className="card-text">
                          Price: {meal.price}<br />
                          {meal.veg ? 'Veg' : 'Non-Veg'}<br />
                        </p>
                        <a href="#" className="btn btn-primary">Add to Cart</a>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
