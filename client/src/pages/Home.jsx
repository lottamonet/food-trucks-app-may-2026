import "../App.css";
import "./styles/home.css";
import React, { useState, useEffect } from "react";
import TruckCard from "./TruckCard";

function Home() {
  // State to hold the list of food trucks
  const [foodTrucks, setFoodTrucks] = useState([]);
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch food trucks from the server
  const fetchFoodTrucks = async () => {
    try {
      const response = await fetch("/api/get-all-food-trucks");
      const data = await response.json();

      console.log("Fetched food trucks:", data);
      setFoodTrucks(data);
    } catch (error) {
      console.error("Error fetching food trucks:", error);
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter food trucks by search term
  const filteredFoodTrucks = foodTrucks.filter((truck) =>
    truck.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort food trucks
  const sortFoodTrucks = (sortTerm) => {
    let sortedTrucks = [...foodTrucks];

    if (sortTerm === "price") {
      sortedTrucks.sort((a, b) => a.price_level - b.price_level);
    } else if (sortTerm === "rating") {
      sortedTrucks.sort((a, b) => b.rating - a.rating);
    }
    setFoodTrucks(sortedTrucks);
  };

  // Delete a food truck
  const handleDeleteTruck = async (id) => {
    try {
      const response = await fetch(`/api/delete-one-food-truck:${id}`, {
        method: "POST",
      });

      if (response.ok) {
        setFoodTrucks(foodTrucks.filter((truck) => truck.id !== id));
      } else {
        console.error("Failed to delete food truck");
      }
    } catch (error) {
      console.error("Error deleting food truck:", error);
    }
  };

  // Fetch trucks when page loads
  useEffect(() => {
    fetchFoodTrucks();
  }, []);

  

  return (
    <>
      <div className="home-content">
        <h1 className="home-title">All Food Trucks</h1>

        <div className="search-bar-and-sort">
          <input
            type="search"
            placeholder="🔍 Search food trucks..."
            onChange={handleSearch}
            value={searchTerm}
          />

          <div className="sort-button-section">
            <button
              className="sort-button"
              onClick={() => sortFoodTrucks("price")}
            >
              💲 Price
            </button>

            <button
              className="sort-button"
              onClick={() => sortFoodTrucks("rating")}
            >
              ⭐ Rating
            </button>
          </div>
        </div>

        <p className="food-truck-count">
          Showing {filteredFoodTrucks.length} of {foodTrucks.length} Food Trucks
        </p>

        <div className="food-truck-list">
          {filteredFoodTrucks.map((truck) => (
            <TruckCard
              key={truck.id}
              truck={truck}
              onDelete={handleDeleteTruck}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

