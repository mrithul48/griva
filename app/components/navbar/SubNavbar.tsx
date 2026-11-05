"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Menu } from "lucide-react";
import ShopeCategoryDropDown from "../dropdowns/ShopeCategoryDropDown";
import { useWishlist } from "@/app/context/WishlistContext";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownData {
  [key: string]: DropdownItem[];
}

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  active?: boolean;
}

const shopCategories: DropdownItem[] = [
  { label: "Electronics", href: "/shop?category=electronics" },
  { label: "Fashion", href: "/shop?category=fashion" },
  { label: "Accessories", href: "/shop?category=accessories" },
  { label: "Gaming", href: "/shop?category=gaming" },
  { label: "Mobiles", href: "/shop?category=mobiles" },
];

const dropdownData: DropdownData = {
  Home: [
    { label: "Home Style 1", href: "/" },
    { label: "Home Style 2", href: "/" },
  ],
  Laptops: [
    { label: "Gaming Laptop", href: "/shop?category=electronics" },
    { label: "Business Laptop", href: "/shop?category=electronics" },
    { label: "Macbook", href: "/shop?category=electronics" },
  ],
  Smartphone: [
    { label: "iPhone", href: "/shop?category=mobiles" },
    { label: "Samsung", href: "/shop?category=mobiles" },
    { label: "Xiaomi", href: "/shop?category=mobiles" },
  ],
  Headphones: [
    { label: "Wireless", href: "/shop?category=accessories" },
    { label: "Gaming", href: "/shop?category=accessories" },
    { label: "Studio", href: "/shop?category=accessories" },
  ],
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/", hasDropdown: true, active: true },
  { label: "Laptops", href: "/shop?category=electronics", hasDropdown: true },
  { label: "Smartphone", href: "/shop?category=mobiles", hasDropdown: true },
  { label: "Headphones", href: "/shop?category=accessories", hasDropdown: true },
  { label: "Camera", href: "/shop?category=electronics" },
];

export default function SubNavbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="w-full border-y border-gray-200 bg-white px-10">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center">
          {/* Categories Button */}
          <div
            className="relative h-14"
            onMouseEnter={() => setActiveDropdown("shop-categories")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex h-14 items-center gap-3 border-r border-[#E2E8F0] pr-10 hover:text-[#0F2E5C] transition-colors">
              <Menu size={20} className="text-[#0F2E5C]" />
              <span className="text-sm font-semibold text-[#171E2B] hover:text-[#0F2E5C] transition-colors">
                Shop Categories
              </span>
              <ChevronDown size={16} className="text-[#64748B]" />
            </button>

            <ShopeCategoryDropDown
              items={shopCategories}
              isOpen={activeDropdown === "shop-categories"}
            />
          </div>

          {/* Navigation */}
          <nav className="ml-10 hidden items-center gap-12 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative flex h-14 items-center"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 ${
                    link.active
                      ? "text-[#0F2E5C] font-bold"
                      : "text-[#171E2B] hover:text-[#0F2E5C]"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={14} className="mt-[1px]" />
                  )}
                </Link>

                {link.hasDropdown && (
                  <div className="absolute left-0 top-full">
                    <ShopeCategoryDropDown
                      items={dropdownData[link.label] || []}
                      isOpen={activeDropdown === link.label}
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative flex items-center border-r border-[#E2E8F0] pr-8 group cursor-pointer"
          >
            <Heart size={22} className="stroke-[1.8] text-[#171E2B] group-hover:text-[#0F2E5C] transition-colors" />
            {wishlistItems.length > 0 && (
              <span className="absolute -right-1 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#0F2E5C] text-[10px] font-bold text-white px-1 animate-pulse">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Deal */}
          <Link href="/shop" className="flex items-center gap-2 group">
            <span className="text-sm font-semibold text-[#171E2B] group-hover:text-[#0F2E5C] transition-colors">
              Today's Deal
            </span>
            <span className="rounded bg-[#0F2E5C] px-1.5 py-[2px] text-[10px] font-bold uppercase text-white animate-bounce">
              Hot
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
