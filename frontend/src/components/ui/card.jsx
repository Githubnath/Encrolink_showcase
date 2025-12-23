// src/components/ui/card.jsx
import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      {...props}
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
    >
      {children}
    </div>
  );
}

// ✅ CardContent for consistent inner padding/styling
export function CardContent({ children, className = '', ...props }) {
  return (
    <div
      {...props}
      className={`p-4 ${className}`}
    >
      {children}
    </div>
  );
}

