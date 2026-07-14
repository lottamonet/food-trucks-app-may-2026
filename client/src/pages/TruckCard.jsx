import React from "react";

function TruckCard({ truck }) {
    //convert the rating to stars
    const ratingStars = "⭐".repeat(Math.round(truck.rating)) + "☆".repeat(5 - Math.round(truck.rating));

    //convert the price level to dollar signs
    const priceLevel = "$".repeat(truck.price_level);

    // Check if the truck is top rated
    const isTopRated = truck.rating >= 4.5; 

    return (
        <div className="truck-card">
            <button
                className="delete-button"
                onClick={() => { truck.onDelete(truck.id);}}
            >
                ⓧ
            </button>
            <h2>{truck.name}</h2>
            <p className="id">
                <span className="label">ID: </span>
                <span className="value">{truck.id}</span>
            </p>
            <p className="location">
                <span className="label">Location: </span>
                <span className="value">{truck.current_location}</span>
            </p>
            <p className="dailySpecial">
                <span className="label">Daily Special: </span>
                <span className="value">{truck.daily_special}</span>
            </p>
            <p className="slogan">
                <span className="label">Slogan: </span>
                <span className="value">{truck.slogan}</span>
            </p>
            <p className="veganOptions">
                <span className="label">Vegan Options: </span>
                <span className="value">{truck.has_vegan_options ? "Yes✅" : "No❌"}</span>
            </p>
            <p className="priceLevel">
                <span className="label">Price Level: </span>
                <span className="value">{priceLevel}</span>
            </p>
            <p className="rating">
                <span className="label">Rating: </span>
                <span className="value">
                    {ratingStars} ({truck.rating})
                </span>
            </p>
            {isTopRated && (
                <div className="top-rated-badge">
                    <span className="badge">🏆 Top Rated</span>
                </div>
            )}
        </div>
    );
}

export default TruckCard;

