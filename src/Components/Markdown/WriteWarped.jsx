import { useParams } from 'react-router-dom';
import Write from './Write';

export default function WriteWrapper({ articles, handlePublish }) {
  const { id } = useParams();
  const articleToEdit = articles.find(a => a.id.toString() === id);

  return (
    <Write
      articleToEdit={articleToEdit}
      handlePublish={handlePublish}
      navigateBack={() => window.history.back()}
    />
  );
}
