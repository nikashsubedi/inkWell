import React,{useState} from 'react';
import mockData from '../../mockData';
import ArticleCard from '../Articals/ArticleCard';
import { useNavigate } from "react-router-dom";

console.log(ArticleCard);

export default function Explore ({articles }){
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : [];

  return (
    <>
      <h2 className="text-3xl font-bold text-dark-grey mb-8 font-poppins text-center">Discover Topics & Categories</h2>
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {mockData.categories.map(category => (
          <span
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 bg-white rounded-full text-medium-grey text-sm font-semibold shadow-sm hover:bg-light-blue hover:text-primary-blue transition-colors duration-200 cursor-pointer ${selectedCategory === category.name ? 'bg-primary-blue text-white' : ''}`}
          >
            {category.name}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
 


{mockData.categories.map(category => {
  const articleCount = articles.filter(article => article.category === category.name).length;

  return (
    <div
      key={category.name}
      className="explore-category-card"
      onClick={() => setSelectedCategory(category.name)}
    >
      <h4 className="text-xl font-bold font-poppins text-dark-grey">{category.name}</h4>
      <p className="text-sm text-medium-grey category-count">
        {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
      </p>
    </div>
  );
})}





      </div>
      {selectedCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       
          {filteredArticles.map(article => (
  <ArticleCard
    key={article.id}
    article={article}
    onClick={() => navigate(`/article/${article.id}`)}
  />
))}
        </div>
      )}
    </>
  );
};