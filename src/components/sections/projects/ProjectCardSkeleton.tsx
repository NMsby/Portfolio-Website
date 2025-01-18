import React from 'react';

const ProjectCardSkeleton = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
            {/* Image Skeleton */}
            <div className="h-48 bg-gray-200"/>

            {/* Content Skeleton */}
            <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    {/* Title Skeleton */}
                    <div className="h-6 w-2/3 bg-gray-200 rounded"/>
                    {/* Category Tag Skeleton */}
                    <div className="h-6 w-24 bg-gray-200 rounded-full"/>
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"/>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"/>
                    <div className="h-4 w-4/6 bg-gray-200 rounded"/>
                </div>

                {/* Technologies Skeleton */}
                <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCardSkeleton;