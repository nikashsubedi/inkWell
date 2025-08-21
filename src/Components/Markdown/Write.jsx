import React,{useState} from 'react';
import mockData from '../../mockData';
import { useNavigate } from 'react-router-dom';

export default function Write({ navigateBack, articleToEdit, handlePublish,handleDelete  }) {
const navigate = useNavigate();

  const [articleTitle, setArticleTitle] = useState(articleToEdit ? articleToEdit.title : '');
  const [articleSummary, setArticleSummary] = useState(articleToEdit ? articleToEdit.summary : '');
  const [articleCategory, setArticleCategory] = useState(articleToEdit ? articleToEdit.category : '');
  const [markdownContent, setMarkdownContent] = useState(articleToEdit ? articleToEdit.markdownContent : '');
 const [articleImage, setArticleImage] = useState(articleToEdit ? articleToEdit.image : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArticle = {
      id: articleToEdit ? articleToEdit.id : null, // Retain ID if editing
      title: articleTitle,
      summary: articleSummary,
      category: articleCategory,
      markdownContent: markdownContent,
      author: 'Current User', // Placeholder for a logged-in user
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      // image: articleImage || 'https://placehold.co/1200x600/6B7280/F3F4F6?text=Custom+Article',
      // image: articleImage || 'https://placehold.co/1200x600?text=',

      image: articleImage || 'https://placehold.co/1200x600/6B7280/F3F4F6?text=Custom+Article', // Placeholder image
      readTime: '5 min read', // Placeholder for read time calculation
      isFeatured: false,
      isTrending: false,
    };
    handlePublish(newArticle);
    // Reset form after submission
    setArticleTitle('');
    setArticleSummary('');
    setArticleCategory('');
    setMarkdownContent('');
    navigate('/explore');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-dark-grey mb-8 font-poppins text-center">
        {articleToEdit ? 'Edit Article' : 'Write a New Article'}
      </h2>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="article-title" className="block text-sm font-semibold text-medium-grey mb-2">Title</label>
            <input
              type="text"
              id="article-title"
              value={articleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
              placeholder="Enter a compelling title"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="article-summary" className="block text-sm font-semibold text-medium-grey mb-2">Summary</label>
            <input
              type="text"
              id="article-summary"
              value={articleSummary}
              onChange={(e) => setArticleSummary(e.target.value)}
              placeholder="A brief summary of your article"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="article-category" className="block text-sm font-semibold text-medium-grey mb-2">Category</label>
            {/* <select
              id="article-category"
              value={articleCategory}
              onChange={(e) => setArticleCategory(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select a Category</option>
              {mockCategories.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select> */}

<select
  id="article-category"
  value={articleCategory}
  onChange={(e) => setArticleCategory(e.target.value)}
  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
  required
>
  <option value="">Select a Category</option>
  {mockData.categories.map(category => (
    <option key={category.name} value={category.name}>{category.name}</option>
  ))}
</select>


          </div>
          <div className="mb-6">
            <label htmlFor="article-image" className="block text-sm font-semibold text-medium-grey mb-2">Image URL</label>
              <input
                type="url"
                id="article-image"
                value={articleImage}
                onChange={(e) => setArticleImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200"
              />
            <label className="block text-sm font-semibold text-medium-grey mb-2">Content (Markdown)</label>
            <textarea
              id="markdown-editor"
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              rows="15"
              placeholder="Start writing your article here using Markdown..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-200 resize-none"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">


            {articleToEdit && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this article?")) {
                      handleDelete(articleToEdit.id);
                      navigate('/explore');
                    }
                  }}
                  className="bg-red-500 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transition-colors duration-200 shadow-md"
                  >
                    Delete
                  </button>
                )}






            <button type="button" onClick={navigateBack} className="bg-white text-dark-grey py-3 px-8 rounded-full font-semibold border border-gray-200 hover:bg-light-grey transition-colors duration-200 shadow-md">
              Cancel
            </button>
            <button type="submit" className="bg-primary-blue text-white py-3 px-8 rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-200 shadow-md">
              {articleToEdit ? 'Save Changes' : 'Publish Article'}
            </button>




            
          </div>
        </form>
      </div>
    </div>
  );
};
