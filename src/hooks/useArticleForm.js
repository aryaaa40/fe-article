import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleService } from '../api/articleService';
import { ARTICLE_STATUS } from '../constants/article';

export const useArticleForm = (isEdit = false) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit && id) {
      fetchArticle();
    }
  }, [isEdit, id]);

  const fetchArticle = async () => {
    try {
      setFetching(true);
      const data = await articleService.getById(id);
      setFormData({
        title: data.title,
        content: data.content,
        category: data.category,
      });
    } catch (err) {
      setErrors({ global: err.message });
    } finally {
      setFetching(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.title.trim().length < 20) {
      newErrors.title = 'Title must be at least 20 characters';
    }
    if (formData.content.trim().length < 200) {
      newErrors.content = 'Content must be at least 200 characters';
    }
    if (formData.category.trim().length < 3) {
      newErrors.category = 'Category must be at least 3 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (status) => {
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = { ...formData, status };
      
      if (isEdit) {
        await articleService.update(id, payload);
      } else {
        await articleService.create(payload);
      }
      
      navigate('/posts');
    } catch (err) {
      setErrors({ global: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return {
    formData,
    loading,
    fetching,
    errors,
    handleChange,
    handleSubmit,
    ARTICLE_STATUS
  };
};
