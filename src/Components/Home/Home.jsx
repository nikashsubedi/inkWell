import React,{useState,useEffect} from 'react';
import mockData from '../../mockData';
import FeaturedArticleCard from '../Articals/FeaturedArticleCard';
import ArticleCard from '../Articals/ArticleCard';

import { useNavigate } from "react-router-dom";


export default function Home({ articles }){
  const navigate = useNavigate();
   const [activeTab, setActiveTab] = useState('latest');
  const [displayCount, setDisplayCount] = useState(3);
  const [featuredIndex, setFeaturedIndex] = useState(0);
const [selectedCategory, setSelectedCategory] = useState(null);



useEffect(() => {
  let lastIndex = featuredIndex;

  const timer = setInterval(() => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * mockData.featuredArticles.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    setFeaturedIndex(randomIndex);
  }, 5000);

  return () => clearInterval(timer);
}, [featuredIndex]);


  const featuredArticle = mockData.featuredArticles[featuredIndex];


  const getArticlesForTab = (tab) => {
  if (tab === 'Featured') {
    return articles.filter(article => article.isFeatured);
  }

  if (tab === 'Trending') {
    return articles.filter(article => article.isTrending);
  }

  // For "Latest" tab or default
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
};


const articlesForCurrentTab = getArticlesForTab(activeTab);

const [shuffledArticles, setShuffledArticles] = useState([]);

useEffect(() => {
  const shuffled = [...articlesForCurrentTab].sort(() => 0.5 - Math.random());
  setShuffledArticles(shuffled);
}, [activeTab, articles]);

const articlesToDisplay = shuffledArticles.slice(0, displayCount);


  return (
    <>
      <section className="mb-12">
        <div id="featured-post-wrapper" className="relative">
        
          <FeaturedArticleCard
            article={featuredArticle}
            onClick={() => navigate(`/article/${featuredArticle.id}`)}
          />


          <div className="flex justify-center mt-4 space-x-2">
            {mockData.featuredArticles.map((_, index) => (
              <span
                key={index}
                className={`featured-dot ${index === featuredIndex ? 'active' : ''}`}
                onClick={() => setFeaturedIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-dark-grey mb-6 font-poppins">Explore Categories</h2>
        <div className="flex flex-wrap gap-3">
     





                {mockData.categories.map(category => {
                  const articleCount = articles.filter(article => article.category === category.name).length;

                  return (
                    <span
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)} // toggle filter
                      className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm cursor-pointer transition-colors duration-200 ${
                        selectedCategory === category.name
                          ? 'bg-primary-blue text-white'
                          : 'bg-white text-medium-grey hover:bg-light-blue hover:text-primary-blue'
                      }`}
                    >
                      {category.name} ({articleCount})
                    </span>
                  );
                })}




        </div>
      </section>
{selectedCategory && (
  <section className="mb-12">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-bold text-dark-grey font-poppins">
        Articles in "{selectedCategory}"
      </h3>
      <button
        onClick={() => setSelectedCategory(null)}
        className="text-sm text-primary-blue font-semibold hover:underline"
      >
        Clear Filter
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles
        .filter(article => article.category === selectedCategory)
        .map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onClick={() => navigate(`/article/${article.id}`)}
          />
        ))}
    </div>
  </section>
)}






      <section className="mb-8">
        <div className="flex border-b border-gray-200 mb-6">
          <TabButton label="Latest" tab="latest" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton label="Trending" tab="trending" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton label="Following" tab="following" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {articlesForCurrentTab.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
              {articlesToDisplay.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onClick={() => navigate(`/article/${article.id}`)} // navigate on click
                  />
                ))}
            </div>
            <div className="text-center mt-10 flex justify-center space-x-4">
              {displayCount < articlesForCurrentTab.length && (
                <button
                  onClick={() => setDisplayCount(prevCount => prevCount + 3)}
                  className="bg-primary-blue text-white py-3 px-8 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Load More Articles
                </button>
              )}
              {displayCount > 3 && (
                <button
                  onClick={() => setDisplayCount(prevCount => Math.max(3, prevCount - 3))}
                  className="py-3 px-8 rounded-full font-semibold shadow-md hover:shadow-lg transition-colors duration-200"
                >
                  Show Fewer Articles
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-medium-grey">
            <i className="fas fa-user-friends text-6xl mb-4"></i>
            <h3 className="text-2xl font-semibold mb-2">Feature Under Development</h3>
            <p>This section will show articles from authors you follow once you're signed in.</p>
          </div>
        )}
      </section>
    </>
  );
};



const TabButton = ({ label, tab, activeTab, setActiveTab }) => {
  const isActive = activeTab === tab;
  return (
    <button
      onClick={() => { setActiveTab(tab); }}
      className={`tab-button py-3 px-6 font-semibold transition-colors duration-200 ${isActive ? 'text-dark-grey border-b-2 border-primary-blue' : 'text-medium-grey hover:text-primary-blue'}`}
    >
      {label}
    </button>
  );
};






