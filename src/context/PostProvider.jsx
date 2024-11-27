import { useState, useEffect, createContext } from 'react';
import { loadAllPostsByuserId } from '../services/post-service';
import { toast } from 'react-toastify';
import { CurrentUser } from '../auth';  // Ensure this import is correct

import postContext from './postContext';  // Import the context

const PostProvider = ({ children }) => {
  const [postContentusingContextApi, setPostContentusingContextApi] = useState({
    Contents: [],
    LastPage: 0,
    PageNumber: 1,
    PageSize: 10,
    TotalElements: 0,
    TotalPages: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage <= postContentusingContextApi.TotalPages || postContentusingContextApi.TotalPages === 0) {
      changePageFromContext(currentPage);
    }
  }, [currentPage]);

  // Handle the logic for changing the page
  const changePageFromContext = (pageNumber) => {
    if (postContentusingContextApi.TotalPages > 0 && pageNumber > postContentusingContextApi.TotalPages) return;

    const userId = CurrentUser()?.Id;
    if (!userId) {
      toast.error('User not authenticated');
      return;
    }

    loadAllPostsByuserId(pageNumber, postContentusingContextApi.PageSize, userId)
      .then((data) => {
        console.log('Loaded posts by user ID:', data);

        setPostContentusingContextApi((prevState) => ({
          Contents: pageNumber === 1 ? data.Contents : [...prevState.Contents, ...data.Contents],
          LastPage: data.LastPage,
          PageNumber: data.PageNumber,
          PageSize: data.PageSize,
          TotalElements: data.TotalElements,
          TotalPages: data.TotalPages,
        }));
      })
      .catch((error) => {
        console.error('Error loading posts:', error);
        toast.error('Error in loading posts pagewise');
      });
  };

  // This function is used to handle infinite scroll (changing pages automatically)
  const changePageInfiniteusingContextApi = () => {
    if (currentPage < postContentusingContextApi.TotalPages || postContentusingContextApi.TotalPages === 0) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <postContext.Provider value={{
      postContentusingContextApi,
      changePageInfiniteusingContextApi,
      changePageFromContext
    }}>
      {children}
    </postContext.Provider>
  );
};

export default PostProvider;
