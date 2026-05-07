import { useState, useEffect, useMemo } from 'react';
import { articleService } from '../api/articleService';
import { ARTICLE_STATUS } from '../constants/article';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(ARTICLE_STATUS.PUBLISH);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getAll(100, 0);
      setArticles(Array.isArray(response) ? response : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => article.status === activeTab);
  }, [articles, activeTab]);

  const thrashArticle = async (id) => {
    try {
      await articleService.delete(id);
      await fetchArticles();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  return {
    articles: filteredArticles,
    loading,
    error,
    activeTab,
    setActiveTab,
    thrashArticle,
    refresh: fetchArticles
  };
};
