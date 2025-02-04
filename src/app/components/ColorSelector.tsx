import React from "react";

interface ColorSelectorProps {
  colors: string[];
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors }) => {
  if (!colors || colors.length === 0) {
    return <p className="text-gray-500 text-center">No colors available</p>;
  }

  return (
    <div className="mt-2">
      <p className="font-semibold text-gray-700">Select Color:</p>
      <div className="flex gap-2 mt-2">
        {colors.map((color, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-full border-2 border-gray-300"
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
