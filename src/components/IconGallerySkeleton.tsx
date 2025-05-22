
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface IconGallerySkeletonProps {
  count?: number;
}

const IconGallerySkeleton = ({ count = 6 }: IconGallerySkeletonProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(count)].map((_, i) => (
        <Card key={i} className="bg-black/50 border border-gray-800">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="animate-pulse w-16 h-16 bg-gray-700/30 rounded-md mb-4"></div>
            <div className="animate-pulse w-24 h-4 bg-gray-700/30 rounded-md"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IconGallerySkeleton;
