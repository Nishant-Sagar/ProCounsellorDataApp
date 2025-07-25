'use client';

import { useState } from 'react';
import { Newspaper, ChevronDown, ChevronUp, ExternalLink, Play, Calendar, Eye } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

type NewsItem = {
  newsId: string;
  newsHeading: string;
  newsRelatedPhotoUrl: string;
  newsRelatedVideoUrl: string;
  fullNewsDescription: string;
};

type NewsProps = {
  college: {
    News?: NewsItem[];
  };
};

export default function News({ college }: NewsProps) {
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  // Convert to array if needed, handle null/undefined
  const newsItems = Array.isArray(college.News) 
    ? college.News 
    : college.News 
      ? [college.News] 
      : [];

  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Newspaper className="w-5 h-5 text-red-600" />
          </div>
          Latest News
        </h3>
        <div className="text-center py-8">
          <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
            <Newspaper className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No news information available.</p>
        </div>
      </div>
    );
  }

  const toggleNews = (newsId: string) => {
    setExpandedNews(expandedNews === newsId ? null : newsId);
  };

  // Show only first 2 news items unless "showAll" is true
  const displayedItems = showAll ? newsItems : newsItems.slice(0, 2);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
        <div className="bg-red-100 p-2 rounded-lg">
          <Newspaper className="w-5 h-5 text-red-600" />
        </div>
        Latest News
      </h3>

      <div className="space-y-3">
        {displayedItems.map((item) => (
          <div 
            key={item.newsId} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* News Header */}
            <div 
              className="bg-gradient-to-r from-red-50 to-orange-50 border-red-100 hover:border-red-200 p-3 cursor-pointer hover:shadow-sm transition-all duration-200"
              onClick={() => toggleNews(item.newsId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    {item.newsRelatedPhotoUrl && item.newsRelatedPhotoUrl !== 'NA' ? (
                      <div className="w-4 h-4 rounded overflow-hidden">
                        <ImageWithFallback
                          src={item.newsRelatedPhotoUrl}
                          alt={item.newsHeading}
                          width={16}
                          height={16}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <Calendar className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                      {item.newsHeading}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-white/60 px-2 py-0.5 rounded-full text-xs text-gray-600">
                        News Update
                      </span>
                      {item.newsRelatedVideoUrl && item.newsRelatedVideoUrl !== 'NA' && (
                        <span className="flex items-center gap-1 text-xs text-gray-600">
                          <Play className="w-3 h-3" />
                          Video
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  {expandedNews === item.newsId ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded News Content */}
            {expandedNews === item.newsId && (
              <div className="border-t border-gray-200 bg-gray-50">
                {/* News Overview */}
                <div className="p-3 space-y-3">
                  {/* News Description */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-red-600" />
                      News Details
                    </h5>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.fullNewsDescription}</p>
                  </div>

                  {/* News Media */}
                  {(item.newsRelatedPhotoUrl !== 'NA' || item.newsRelatedVideoUrl !== 'NA') && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                        Media
                      </h5>
                      
                      {/* News Image */}
                      {item.newsRelatedPhotoUrl && item.newsRelatedPhotoUrl !== 'NA' && (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-3">
                          <div className="w-full h-32 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={item.newsRelatedPhotoUrl}
                              alt={item.newsHeading}
                              width={300}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {item.newsRelatedVideoUrl && item.newsRelatedVideoUrl !== 'NA' && (
                          <a
                            href={item.newsRelatedVideoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium hover:bg-red-200 transition-colors"
                          >
                            <Play className="w-3 h-3" />
                            Watch
                          </a>
                        )}
                        
                        {item.newsRelatedPhotoUrl && item.newsRelatedPhotoUrl !== 'NA' && (
                          <a
                            href={item.newsRelatedPhotoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* See More / See Less Button - Only show when more than 2 items */}
      {newsItems.length > 2 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            {showAll ? 'Show Less' : `See More News`}
            <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
              {showAll ? `Hide ${newsItems.length - 2}` : `+${newsItems.length - 2} More`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
