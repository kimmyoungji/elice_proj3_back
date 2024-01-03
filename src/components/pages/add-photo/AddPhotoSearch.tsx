import { useLocation } from "react-router-dom";

const AddPhotoSearch = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  return <div>AddPhotoSearch {query.get("name")}</div>;
};

export default AddPhotoSearch;
