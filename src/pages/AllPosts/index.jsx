import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, Trash2, FileText, AlertCircle } from 'lucide-react';
import { useArticles } from '../../hooks/useArticles';
import { TABS } from '../../constants/article';

const AllPosts = () => {
  const navigate = useNavigate();
  const { 
    articles, 
    loading, 
    error, 
    activeTab, 
    setActiveTab, 
    thrashArticle 
  } = useArticles();

  const handleThrash = async (id, title) => {
    if (window.confirm(`Are you sure you want to move "${title}" to thrash?`)) {
      await thrashArticle(id);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-danger bg-red-50 rounded-2xl border border-red-100">
        <AlertCircle size={48} className="mb-4" />
        <h3 className="font-bold text-lg">Failed to load articles</h3>
        <p className="text-sm">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-white border border-red-200 rounded-lg text-danger font-semibold hover:bg-red-100 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="tabs-container">
        {TABS.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="table-container">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="spinner mb-4"></div>
            <p className="text-slate-400 font-medium">Fetching articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div 
            className="flex flex-col items-center justify-center bg-slate-50 rounded-3xl border border-dashed border-slate-200"
            style={{ minHeight: '450px' }}
          >
            <div className="flex flex-col items-center text-center px-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <FileText size={40} className="text-indigo-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-2xl mb-2">No articles found</h3>
              <p className="text-slate-500 font-medium max-w-[320px] leading-relaxed">
                There are no articles in the <span className="text-indigo-600">"{TABS.find(t => t.id === activeTab)?.label}"</span> category yet.
              </p>
            </div>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th style={{ width: '60%' }}>Title & Content</th>
                <th style={{ width: '25%' }}>Category</th>
                <th style={{ textAlign: 'right', width: '15%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id}>
                  <td>
                    <div className="font-semibold text-slate-800 mb-1">{article.title}</div>
                    <div className="text-sm text-slate-400 font-medium line-clamp-1 max-w-[500px]">
                      {article.content}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-indigo">
                      {article.category}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        className="action-btn edit" 
                        title="Edit Article"
                        onClick={() => navigate(`/posts/edit/${article.id}`)}
                      >
                        <Edit3 size={18} />
                      </button>
                      {activeTab !== 'thrash' && (
                        <button 
                          className="action-btn thrash" 
                          title="Move to Thrash"
                          onClick={() => handleThrash(article.id, article.title)}
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllPosts;
