import React from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: (product: Product) => void;
}

export function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <div 
      className={`relative rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:scale-[1.01]'
      }`}
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onSelect(product)}
            className={`p-2 rounded-full transition-colors ${
              isSelected
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isSelected ? (
              <Check className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}