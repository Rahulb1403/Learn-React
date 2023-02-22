import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IMG_CDN_URL } from "../config"
import Shimmer from "./Shimmer"

const RestaurantMenu = () => {
  const { Resid } = useParams()

  const [restaurant, setRestaurant] = useState(null)
  useEffect(() => {
    getRestaurantInfo()
  }, [])

  async function getRestaurantInfo() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/menu/v4/full?lat=28.6738274&lng=77.1642584&menuId=" +
        Resid
    )
    const json = await data.json()
    console.log(json.data)
    setRestaurant(json.data)
  }

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div className="card">
        {/* <h2>Restaurant id : {restaurant.id}</h2> */}
        <h2>{restaurant.name}</h2>
        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} alt="image" />
        <h3>
          {restaurant.area}, {restaurant.city}
        </h3>
        <h3>{restaurant.avgRating} stars</h3>
        <h3>{restaurant.costForTwoMsg}</h3>
      </div>
      <div className="menu-container">
        <h1>Menu</h1>
        <ul className="menu-items">
          {Object.values(restaurant?.menu?.items).map((items) => (
            <li key={items.id}>
              {items.name} - <b>{items.price / 100}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RestaurantMenu
