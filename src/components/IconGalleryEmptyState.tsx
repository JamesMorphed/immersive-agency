
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const IconGalleryEmptyState = () => {
  return (
    <Card className="bg-black/50 border border-gray-800">
      <CardContent className="p-6 flex flex-col items-center justify-center text-center h-40">
        <p className="text-gray-400">No icons found in storage</p>
        <p className="text-sm text-gray-500 mt-2">Upload your first icon using the form above</p>
      </CardContent>
    </Card>
  );
};

export default IconGalleryEmptyState;
