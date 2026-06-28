'use client';

import { JOB_CATEGORIES } from '@/lib/constants';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full">
      <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
        Filter by Category
      </label>
      <div className="relative">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0D1B5E]/20 focus:border-[#0D1B5E] transition-all duration-200 cursor-pointer hover:border-gray-300"
        >
          <option value="">All Categories</option>
          {JOB_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
