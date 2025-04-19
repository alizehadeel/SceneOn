import React from 'react';

const Categories = ({ categories }) => {
  return (
    <section className="categories">
      <h2>Popular Categories</h2>
      <div className="categories-container">
        {categories.map(category => (
          <div key={category.CategoryID} className="category-tag">
            {category.CategoryName}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;