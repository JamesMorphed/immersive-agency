
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CustomIcon, IconVariant } from '@/components/ui/custom-icon';

export interface IconCardProps {
  name: string;
  variants: IconVariant[];
  onDelete: (iconName: string) => void;
}

const IconCard = ({ name, variants, onDelete }: IconCardProps) => {
  return (
    <Card key={name} className="bg-black/50 border border-gray-800">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-medium">{name}</h4>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-red-500"
            onClick={() => onDelete(name)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          {variants.includes('default') && (
            <div className="flex flex-col items-center">
              <CustomIcon name={name} size="lg" />
              <span className="text-xs text-gray-400 mt-2">Default</span>
            </div>
          )}
          
          {variants.includes('magenta') && (
            <div className="flex flex-col items-center">
              <CustomIcon name={name} variant="magenta" size="lg" />
              <span className="text-xs text-gray-400 mt-2">Magenta</span>
            </div>
          )}
          
          {variants.includes('cyan') && (
            <div className="flex flex-col items-center">
              <CustomIcon name={name} variant="cyan" size="lg" />
              <span className="text-xs text-gray-400 mt-2">Cyan</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {variants.length} variant{variants.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default IconCard;
