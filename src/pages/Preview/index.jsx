import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { articleService } from '../../api/articleService';
import { ARTICLE_STATUS } from '../../constants/article';

const ITEMS_PER_PAGE = 2;

const Preview = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPublished = async () => {
      try {
        setLoading(true);
        const response = await articleService.getAll(100, 0);
        const published = (Array.isArray(response) ? response : [])
          .filter(a => a.status === ARTICLE_STATUS.PUBLISH);
        setArticles(published);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPublished();
  }, []);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, currentPage]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <div className="spinner mb-4"></div>
        <p className="text-slate-400 font-medium">Fetching published articles...</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Public Blog Preview</h2>
        <p className="text-slate-500 font-medium mt-1">This is how your published articles appear to the readers.</p>
      </div>

      <div className="form-container">
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No articles have been published yet.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-6">
              {currentData.map((article) => (
                <article key={article.id} className="blog-card" style={{ padding: '2rem' }}>
                  <span className="blog-category" style={{ marginBottom: '0.5rem' }}>{article.category}</span>
                  <h2 className="blog-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{article.title}</h2>
                  <div className="blog-content" style={{ fontSize: '0.95rem' }}>{article.content}</div>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination" style={{ marginTop: '2rem' }}>
                <button 
                  className="page-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={20} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  className="page-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;
