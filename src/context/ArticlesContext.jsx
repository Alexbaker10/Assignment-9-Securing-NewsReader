import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext();

export function useArticles() {
  return useContext(ArticlesContext);
}

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  const [savedArticlesByUser, setSavedArticlesByUser] = useState(() => {
    return JSON.parse(localStorage.getItem('news_saved_articles')) || {};
  });

  useEffect(() => {
    localStorage.setItem('news_saved_articles', JSON.stringify(savedArticlesByUser));
  }, [savedArticlesByUser]);

  const getUserSavedArticles = () => (user ? savedArticlesByUser[user.username] || [] : []);

  const saveArticle = (article) => {
    if (!user) return;
    setSavedArticlesByUser(prev => ({
      ...prev,
      [user.username]: [...(prev[user.username] || []), article]
    }));
  };

  const removeArticle = (articleId) => {
    if (!user) return;
    setSavedArticlesByUser(prev => ({
      ...prev,
      [user.username]: prev[user.username].filter(a => a.uri !== articleId)
    }));
  };

  const getAllUserArticles = () => savedArticlesByUser;

  return (
    <ArticlesContext.Provider value={{ 
      getUserSavedArticles, 
      saveArticle, 
      removeArticle, 
      getAllUserArticles 
    }}>
      {children}
    </ArticlesContext.Provider>
  );
}