


export default function ArticleCard({article, onClick}){
    return(
        <>
          <div onClick={onClick} className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer">
    <img src={article.image} alt={article.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/6B7280/F3F4F6?text=Image+Not+Found"; }} />
    <div className="p-6">
      <span className="text-primary-blue text-xs font-semibold mb-2">{article.category}</span>
      <h4 className="text-xl font-bold text-dark-grey mb-2 font-poppins">{article.title}</h4>
      <p className="text-medium-grey text-sm mb-4">{article.summary}</p>
      <div className="flex items-center space-x-3 text-medium-grey text-xs">
        <span><i className="fas fa-user-circle"></i> {article.author}</span>
        <span><i className="fas fa-calendar-alt"></i> {article.date}</span>
      </div>
    </div>
  </div>
        </>
    )
}