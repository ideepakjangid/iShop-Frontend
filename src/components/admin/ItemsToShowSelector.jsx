"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ItemsToShowSelector = ({ options = [5, 10, 20, 50], onChange }) => {
  const [selected, setSelected] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (value) => {
    setSelected(value);
    onChange && onChange(value);
    setIsOpen(false);

    const url = new URL(window.location.href)
    url.searchParams.set("limit",value);
    router.push(url.toString())

  };



  return (
   <div className="w-full border rounded-lg my-4">
     <div className="relative w-48">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-gray-700 bg-white  shadow-sm focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Show {selected} items <FaChevronDown className="ml-2" />
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
   </div>
  );
};

export default ItemsToShowSelector;
