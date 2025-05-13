
import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ value = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '') {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const tag = inputValue.trim();
    if (tag && !value.includes(tag)) {
      const newTags = [...value, tag];
      onChange(newTags);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag, index) => (
          <div 
            key={index} 
            className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center text-sm"
          >
            <span>{tag}</span>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="ml-1 p-0 h-5 w-5 hover:bg-gray-600 rounded-full"
              onClick={() => removeTag(index)}
            >
              <X size={12} />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="flex">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add tags"
          className="flex-1"
        />
        <Button 
          type="button" 
          onClick={addTag} 
          className="ml-2"
          disabled={inputValue.trim() === ''}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TagsInput;
