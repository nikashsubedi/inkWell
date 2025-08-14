import { Routes, Route ,useNavigate  } from "react-router-dom";
import MainLayout from './routes/MainLayout';
import Home from './Components/Home/Home';
import Explore from './Components/AllPost/Explore';
import ArticlePostWrapper from './Components/Articals/ArticlePostWrapper';
import Write from './Components/Markdown/Write';
import React, { useState } from 'react';
import mockData from "./mockData";
import WriteWrapper from "./Components/Markdown/WriteWarped";

function App() {
  const navigate = useNavigate();
const [articles, setArticles] = useState([
  ...mockData.articles,
  ...mockData.featuredArticles,
  ...mockData.trendingArticles
]);


const handlePublish = (newArticle) => {
  const updatedArticles = [...articles];

  // Add/update date in a readable format
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  newArticle.date = formattedDate;

  if (newArticle.id) {
    // Edit existing article
    const index = updatedArticles.findIndex(a => a.id === newArticle.id);
    if (index !== -1) {
      updatedArticles[index] = newArticle;
    }
  } else {
    // New article
    newArticle.id = `custom-${Date.now()}`;
    updatedArticles.push(newArticle);
  }

  setArticles(updatedArticles);
  navigate("/explore");
};
const handleDelete = (id) => {
  const updatedArticles = articles.filter(article => article.id !== id);
  setArticles(updatedArticles);
};










  return (
    <>

      <Routes>
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home articles={articles}/>}/>
          <Route path="explore" element={<Explore articles={articles} />} />
           <Route path="article/:id" element={<ArticlePostWrapper articles={articles}/>} />
          <Route  path="write" element={<Write 
              handlePublish={handlePublish}
              navigateBack={() => navigate(-1)}
              handleDelete={handleDelete}
    /> }/>
    {/* <Route path="edit/:id" element={<Write 
      handlePublish={handlePublish}
      navigateBack={() => navigate(-1)}
      handleDelete={handleDelete}
    />} /> */}
<Route path="edit/:id" element={
    <WriteWrapper
      articles={articles}
      handlePublish={handlePublish}
      handleDelete={handleDelete}
    />
  }/>







        </Route>
      </Routes>
  
    </>
  )
}

export default App;


//  navigateBack={() => navigate(-1)}
//   articleToEdit={selectedArticle}
//   handlePublish={handlePublish}
//   handleDelete={handleDelete}