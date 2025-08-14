import { useNavigate } from "react-router-dom";
import ArticlePost from "./ArticlePost";

export default function ArticlePostWrapper({ articles }) {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this article?");
    if (confirmed) {
      navigate("/explore");
    }
  };

  return (
    <ArticlePost 
    articles={articles}
      onBack={() => navigate(-1)}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
