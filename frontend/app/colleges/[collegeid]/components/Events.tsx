// 'use client';

// import { useState } from 'react';
// import { Calendar, Users, ChevronDown, ChevronUp, ExternalLink, Play, Sparkles } from 'lucide-react';
// import ImageWithFallback from './ImageWithFallback';

// type Event = {
//   eventId: string;
//   eventHeading: string;
//   eventRelatedPhotoUrl: string;
//   eventRelatedVideoUrl: string;
//   eventFullDescription: string;
// };

// type EventsProps = {
//   college: {
//     Events?: Event[];
//   };
// };

// export default function Events({ college }: EventsProps) {
//   const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

//   const events = college.Events || [];

//   if (!events || events.length === 0) {
//     return (
//       <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full flex flex-col">
//         <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
//           <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
//             <Calendar className="w-6 h-6 text-purple-600" />
//           </div>
//           Events
//         </h3>
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-center">
//             <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//               <Calendar className="w-8 h-8 text-gray-400" />
//             </div>
//             <p className="text-gray-500">No events information available.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const toggleEvent = (eventId: string) => {
//     setExpandedEvent(expandedEvent === eventId ? null : eventId);
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full flex flex-col">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
//           <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-2 rounded-lg">
//             <Calendar className="w-6 h-6 text-purple-600" />
//           </div>
//           College Events
//         </h3>
//         <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
//           {events.length} Event{events.length !== 1 ? 's' : ''}
//         </div>
//       </div>

//       {/* Events Content - Takes available space */}
//       <div className="flex-1 flex flex-col">
//         <div className="space-y-3 flex-1">
//           {events.map((event, index) => (
//             <div 
//               key={event.eventId} 
//               className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200"
//             >
//               {/* Event Header */}
//               <div 
//                 className="flex items-center justify-between p-4 cursor-pointer hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200"
//                 onClick={() => toggleEvent(event.eventId)}
//               >
//                 <div className="flex items-center gap-4 flex-1">
//                   {/* Event Image */}
//                   {event.eventRelatedPhotoUrl && event.eventRelatedPhotoUrl !== 'NA' ? (
//                     <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
//                       <ImageWithFallback
//                         src={event.eventRelatedPhotoUrl}
//                         alt={event.eventHeading}
//                         width={56}
//                         height={56}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ) : (
//                     <div className="w-14 h-14 bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
//                       <Sparkles className="w-7 h-7 text-purple-600" />
//                     </div>
//                   )}

//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">
//                       {event.eventHeading}
//                     </h4>
//                     <div className="flex items-center gap-2">
//                       <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
//                         College Event
//                       </span>
//                       {event.eventRelatedVideoUrl && event.eventRelatedVideoUrl !== 'NA' && (
//                         <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
//                           <Play className="w-3 h-3" />
//                           Video
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2 text-purple-600">
//                   <span className="text-sm font-medium hidden sm:block">
//                     {expandedEvent === event.eventId ? 'Less' : 'More'}
//                   </span>
//                   {expandedEvent === event.eventId ? (
//                     <ChevronUp className="w-5 h-5" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5" />
//                   )}
//                 </div>
//               </div>

//               {/* Expanded Content */}
//               {expandedEvent === event.eventId && (
//                 <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/30">
//                   {/* Event Image (Large) */}
//                   {event.eventRelatedPhotoUrl && event.eventRelatedPhotoUrl !== 'NA' && (
//                     <div className="p-6 pb-0">
//                       <div className="w-full h-52 rounded-xl overflow-hidden shadow-lg">
//                         <ImageWithFallback
//                           src={event.eventRelatedPhotoUrl}
//                           alt={event.eventHeading}
//                           width={600}
//                           height={300}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   <div className="p-6">
//                     <h5 className="font-bold text-gray-900 mb-4 text-lg">
//                       About {event.eventHeading}
//                     </h5>
//                     <p className="text-gray-700 leading-relaxed mb-6 text-base">
//                       {event.eventFullDescription}
//                     </p>

//                     {/* Action Buttons */}
//                     <div className="flex flex-wrap gap-3">
//                       {event.eventRelatedVideoUrl && event.eventRelatedVideoUrl !== 'NA' && (
//                         <a
//                           href={event.eventRelatedVideoUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                         >
//                           <Play className="w-4 h-4" />
//                           Watch Video
//                         </a>
//                       )}
                      
//                       {event.eventRelatedPhotoUrl && event.eventRelatedPhotoUrl !== 'NA' && (
//                         <a
//                           href={event.eventRelatedPhotoUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                         >
//                           <ExternalLink className="w-4 h-4" />
//                           View Full Image
//                         </a>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* View All Events Button - Only show when more than 2 events */}
//         {events.length > 2 && (
//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <button className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2">
//               <Calendar className="w-5 h-5" />
//               View All College Events
//               <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
//                 {events.length}
//               </span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { Calendar, Users, ChevronDown, ChevronUp, ExternalLink, Play, Sparkles, Eye } from 'lucide-react';
import ImageWithFallback from './ImageWithFallback';

type Event = {
  eventId: string;
  eventHeading: string;
  eventRelatedPhotoUrl: string;
  eventRelatedVideoUrl: string;
  eventFullDescription: string;
};

type EventsProps = {
  college: {
    Events?: Event[];
  };
};

export default function Events({ college }: EventsProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false); // Added state for show/hide functionality

  const events = college.Events || [];

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          College Events
        </h2>
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No events information available.</p>
        </div>
      </div>
    );
  }

  const toggleEvent = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  // Show only first 2 events unless "showAll" is true
  const displayedEvents = showAll ? events : events.slice(0, 2);

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Calendar className="w-6 h-6 text-purple-600" />
        </div>
        College Events
      </h2>

      <div className="space-y-4">
        {displayedEvents.map((event) => (
          <div key={event.eventId} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Event Header */}
            <div 
              className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100 hover:border-purple-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200"
              onClick={() => toggleEvent(event.eventId)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    {event.eventRelatedPhotoUrl && event.eventRelatedPhotoUrl !== 'NA' ? (
                      <div className="w-6 h-6 rounded overflow-hidden">
                        <ImageWithFallback
                          src={event.eventRelatedPhotoUrl}
                          alt={event.eventHeading}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <Calendar className="w-6 h-6 text-purple-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">
                      {event.eventHeading}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="bg-white/60 px-2 py-1 rounded-full">
                        College Event
                      </span>
                      {event.eventRelatedVideoUrl && event.eventRelatedVideoUrl !== 'NA' && (
                        <span className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          Video Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-sm font-medium hidden sm:block">
                    {expandedEvent === event.eventId ? 'Less' : 'Details'}
                  </span>
                  {expandedEvent === event.eventId ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Event Content */}
            {expandedEvent === event.eventId && (
              <div className="border-t border-gray-200 bg-gray-50">
                {/* Event Overview */}
                <div className="p-6 space-y-6">
                  {/* Event Description */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      About {event.eventHeading}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{event.eventFullDescription}</p>
                  </div>

                  {/* Event Media */}
                  {(event.eventRelatedPhotoUrl !== 'NA' || event.eventRelatedVideoUrl !== 'NA') && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-blue-600" />
                        Event Media
                      </h4>
                      
                      {/* Event Image (Large) */}
                      {event.eventRelatedPhotoUrl && event.eventRelatedPhotoUrl !== 'NA' && (
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                          <div className="w-full h-52 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={event.eventRelatedPhotoUrl}
                              alt={event.eventHeading}
                              width={600}
                              height={300}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {event.eventRelatedVideoUrl && event.eventRelatedVideoUrl !== 'NA' && (
                          <div className="bg-white rounded-lg p-3">
                            <h6 className="font-medium text-gray-900 mb-2">Watch Event Video</h6>
                            <a
                              href={event.eventRelatedVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-medium hover:bg-red-200 transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              Watch Video
                            </a>
                          </div>
                        )}
                        
                        {event.eventRelatedPhotoUrl && event.eventRelatedPhotoUrl !== 'NA' && (
                          <div className="bg-white rounded-lg p-3">
                            <h6 className="font-medium text-gray-900 mb-2">View Full Image</h6>
                            <a
                              href={event.eventRelatedPhotoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded text-sm font-medium hover:bg-purple-200 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                              View Image
                            </a>
                          </div>
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

      {/* See More / See Less Button - Only show when more than 2 events */}
      {events.length > 2 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 hover:from-purple-600 hover:via-indigo-600 hover:to-blue-600 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />
            {showAll ? 'Show Less Events' : `See More Events`}
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {showAll ? `Hide ${events.length - 2}` : `+${events.length - 2} More`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
