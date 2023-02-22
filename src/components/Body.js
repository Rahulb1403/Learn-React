// import { restaurantList } from "../config"
import RestaurantCard from "./RestaurantCard"
import { useEffect, useState } from "react"
import Shimmer from "./Shimmer"
import { Link } from "react-router-dom"

function filterData(searchText, restaurant) {
  const filterData = restaurant.filter((res) => {
    return res?.data?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
  })
  return filterData
}

const Body = () => {
  const [searchText, setSearchText] = useState("")
  const [filterRestaurant, setFilterRestaurant] = useState([])
  const [restaurant, setRestaurant] = useState([])

  useEffect(() => {
    getRestaurants()
  }, [])

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6738274&lng=77.1642584&page_type=DESKTOP_WEB_LISTING"
    )
    const json = await data.json()
    setRestaurant(json?.data?.cards[2]?.data?.data?.cards)
    setFilterRestaurant(json?.data?.cards[2]?.data?.data?.cards)
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            const data = filterData(searchText, restaurant)
            setFilterRestaurant(data)
          }}
        >
          Search
        </button>
      </div>

      {restaurant?.length === 0 ? (
        <Shimmer />
      ) : (
        <>
          <div className="search-count">
            {filterRestaurant.length == 0 ? (
              <h3>No Search found</h3>
            ) : (
              <h3>{filterRestaurant.length} restaurant found </h3>
            )}
          </div>
          <div className="restraunt-list">
            {filterRestaurant.map((restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant.data.id}
                  key={restaurant.data.id}
                  className="restaurant-link"
                >
                  <RestaurantCard {...restaurant.data} />
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default Body
