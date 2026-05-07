import React from 'react';
import { Send, FileEdit, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useArticleForm } from '../../hooks/useArticleForm';

const EditPost = () => {
  const navigate = useNavigate();
  const {
    formData,
    loading,
    fetching,
    errors,
    handleChange,
    handleSubmit,
    ARTICLE_STATUS
  } = useArticleForm(true);

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="spinner mb-4"></div>
        <p className="text-slate-400 font-medium">Fetching article data...</p>
      </div>
    );
  }

  return (
    <div className="fade-in form-container">
      <div className="flex items-start gap-4 mb-8">
        <button 
          onClick={() => navigate('/posts')}
          className="mt-1 p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all border-none bg-transparent"
        >
          <ArrowLeft size={22} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Article</h2>
          <p className="text-sm text-slate-500 font-medium">Make changes to your article and update its status.</p>
        </div>
      </div>

      {errors.global && (
        <div className="p-4 mb-8 bg-red-50 text-danger border border-red-100 rounded-2xl flex items-center gap-3 animate-shake">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">{errors.global}</span>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-10">
        <div className="form-group">
          <label className="form-label">Article Title</label>
          <input
            type="text"
            name="title"
            placeholder="Give your article a compelling title (min. 20 chars)"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && (
            <p className="form-error">
              <AlertCircle size={14} /> {errors.title}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input
            type="text"
            name="category"
            placeholder="e.g. Technology, Lifestyle, Business"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'input-error' : ''}
          />
          {errors.category && (
            <p className="form-error">
              <AlertCircle size={14} /> {errors.category}
            </p>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Article Content</label>
          <textarea
            name="content"
            rows="14"
            placeholder="Tell your story here... (min. 200 characters)"
            value={formData.content}
            onChange={handleChange}
            className={errors.content ? 'input-error' : ''}
            style={{ resize: 'vertical' }}
          ></textarea>
          {errors.content && (
            <p className="form-error">
              <AlertCircle size={14} /> {errors.content}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 mt-6 pt-8 border-t border-slate-100">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={loading}
            onClick={() => handleSubmit(ARTICLE_STATUS.DRAFT)}
          >
            <FileEdit size={18} />
            Draft
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={loading}
            onClick={() => handleSubmit(ARTICLE_STATUS.PUBLISH)}
          >
            {loading ? <Loader2 size={18} className="spinner" /> : <Send size={18} />}
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
