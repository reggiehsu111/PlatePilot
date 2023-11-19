'use client'


import { MdOutlineFastfood, MdOutlineOtherHouses } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

import {
  FaHamburger,
  FaFortAwesome,
  FaToriiGate,
  FaHatCowboy,
  FaLeaf,
  FaGlassMartiniAlt,
  FaCoffee,
  FaEgg,
} from 'react-icons/fa';
import {GiElephant, GiNoodles} from 'react-icons/gi';
import { FaPizzaSlice, FaBurger } from 'react-icons/fa6'
import { GiTacos } from 'react-icons/gi'
import { PiBowlFood } from 'react-icons/pi'
import { CiBowlNoodles } from 'react-icons/ci'
import { TbCheese } from 'react-icons/tb'
import { LuEggFried } from "react-icons/lu";



export const categories = [
  {
    label: 'Pizza',
    icon: FaPizzaSlice,
    description: ''
  },
  {
    label: 'Burger',
    icon: FaBurger,
    description: ''
  },
  {
    label: 'Indian',
    icon: GiElephant,
    description: ''
  },
  {
    label: 'Chinese',
    icon: PiBowlFood,
    description: ''
  },
  {
    label: 'Japanese',
    icon: FaToriiGate,
    description: ''
  },
  {
    label: 'Korean',
    icon: GiNoodles,
    description: ''
  },
  {
    label: 'Mexican',
    icon: GiTacos,
    description: ''
  },
  {
    label: 'Italian',
    icon: TbCheese,
    description: ''
  },
  {
    label: 'Vietnamese',
    icon: FaLeaf,
    description: ''
  },
  {
    label: 'Breakfast',
    icon: LuEggFried,
    description: ''
  },
  {
    label: 'Cafe',
    icon: FaCoffee,
    description: ''
  },
  {
    label: 'Drink',
    icon: FaGlassMartiniAlt,
    description: ''
  }
]


const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname == '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between gap-1 overflow-x-auto">
      {categories.map((item) => (
        <CategoryBox
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={category == item.label}
        />
      ))}
    </div>
  )
}

export default Categories
