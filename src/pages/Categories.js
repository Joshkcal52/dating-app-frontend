import React, { useState, useEffect } from "react";
import "../styles/Categories.scss";

export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8089/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Error while fetching data");
        }
      })
      .then((data) => {
        if (data) {
          console.log("data: ", data.categories);
          setCategoryData(data.categories);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const renderCategories = () => {
    return categoryData?.map((category) => (
      <div className="category" key={category.category_id}>
        <br />
        <div className="category-details">
          <div className="category-title">Name:{category.name}</div>
          <div className="category-description">Color: {category.color}</div>
          <br />
        </div>
      </div>
    ));
  };

  return (
    <div className="category-wrapper">
      <p>Categories Page</p>
      {renderCategories()}
    </div>
  );
}
