import mockData from "../../mockData";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { marked } from 'marked';

export default function ArticlePost ({ articles, onBack, onEdit, onDelete }) {
   const { id } = useParams();
  const navigate = useNavigate();

  const [localArticle, setArticle] = useState(null);

 

useEffect(() => {
  const found = articles.find((a) => a.id.toString() === id);
  setArticle(found);
}, [id, articles]);




  // const getHtml = (markdown) => {
  //   if (typeof marked !== 'undefined') {
  //     return { __html: marked.parse(markdown || '') };
  //   }
  //   return { __html: `<p>${markdown || ''}</p>` };
  // };
const getHtml = (markdown) => {
  return { __html: marked.parse(markdown || '') };
};





  if (!localArticle) {
    return (
      <div className="text-center py-16 text-medium-grey">
        <h3 className="text-2xl font-semibold mb-2">Article Not Found</h3>
        <p>The article you are looking for does not exist.</p>
        <button onClick={() => navigate(-1)} className="mt-4 bg-primary-blue text-white py-2 px-6 rounded-full font-semibold hover:bg-opacity-90">Go Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onBack} className="text-primary-blue hover:underline font-semibold">
          <i className="fas fa-arrow-left mr-2"></i>Back
        </button>
        <div className="space-x-2">
          {/* <button onClick={() => onEdit(localArticle.id)} className="bg-white text-primary-blue py-2 px-4 rounded-full font-semibold border border-primary-blue hover:bg-light-blue transition-colors duration-200 shadow-md">
            Edit Post
          </button> */}

          <button
  onClick={() => onEdit(localArticle.id)}
  className="bg-white text-primary-blue py-2 px-4 rounded-full font-semibold border border-primary-blue hover:bg-light-blue transition-colors duration-200 shadow-md"
>
  Edit Post
</button>

          {/* <button onClick={() => onDelete(localArticle.id)} className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 shadow-md">
            Delete Post
          </button> */}

<button
  onClick={() => onDelete(localArticle.id)}
  className="bg-red-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 shadow-md"
>
  Delete Post
</button>





        </div>
      </div>
      <img src={localArticle.image} alt={localArticle.title} className="w-full h-80 object-cover rounded-lg mb-6" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/6B7280/F3F4F6?text=Image+Not+Found"; }} />
      <span className="bg-primary-blue text-white text-sm font-semibold px-4 py-1 rounded-full w-fit mb-4 inline-block">{localArticle.category}</span>
      <h1 className="text-4xl font-bold text-dark-grey mb-4 font-poppins">{localArticle.title}</h1>
      <div className="flex items-center space-x-4 text-medium-grey text-sm mb-6">
        <span><i className="fas fa-user-circle"></i> {localArticle.author}</span>
        <span><i className="fas fa-calendar-alt"></i> {localArticle.date}</span>
        <span><i className="fas fa-clock"></i> {localArticle.readTime}</span>
      </div>
      <div className="prose max-w-none" dangerouslySetInnerHTML={getHtml(localArticle.markdownContent)}></div>
    </div>
  );
};