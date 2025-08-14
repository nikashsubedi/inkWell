
export default function FeaturedArticleCard({ article, onClick }){
    return(
        <>
        
        <div onClick={onClick} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl cursor-pointer">
    <div className="md:w-1/2">
      <img src={article.image} alt={article.title} className="w-full h-64 md:h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x600/6B7280/F3F4F6?text=Image+Not+Found"; }} />
    </div>
    <div className="p-8 md:w-1/2 flex flex-col justify-center">
      <span className="bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">{article.category}</span>
      <h3 className="text-3xl font-bold text-dark-grey mb-2 font-poppins">{article.title}</h3>
      <p className="text-medium-grey mb-4">{article.summary}</p>
      <div className="flex items-center space-x-4 text-medium-grey text-sm">
        <span><i className="fas fa-user-circle"></i> {article.author}</span>
        <span><i className="fas fa-calendar-alt"></i> {article.date}</span>
        <span><i className="fas fa-clock"></i> {article.readTime}</span>
      </div>
    </div>
  </div>
        
        
        
        
        
        </>
    )
}