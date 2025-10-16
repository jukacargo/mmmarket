import { defineProperties, useActiveBreakpoint } from "figma:react";
import imgSportsBanner from "figma:asset/a5ede5e64ecc44ec931de78d20108e8d3a2a0c63.png";
import { useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, User, Heart, Menu, X, ChevronRight, ChevronLeft, Plus, Upload, Camera, Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import imgGirl from "figma:asset/9a6ab2e8199908b4d1761c9eb341986aa9da8fd4.png";
import imgLogo from "figma:asset/ef726f683e949779202aefdbe2f6d8ea65172874.png";

// Logo component - implemented directly in this file
function Logo() {
  return (
    <div className="relative w-full h-full" data-name="LOGO">
      <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none w-full h-full" src={imgLogo} />
    </div>
  );
}

// Mock product data to match the Figma design
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.8,
    discount: 0
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 199.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.5,
    discount: 10
  },
  {
    id: 3,
    name: "Designer Leather Handbag",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.7,
    discount: 0
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.6,
    discount: 15
  },
  {
    id: 5,
    name: "Smartphone Pro Max",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.9,
    discount: 5
  },
  {
    id: 6,
    name: "Casual Denim Jacket",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.4,
    discount: 0
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.7,
    discount: 0
  },
  {
    id: 8,
    name: "Fitness Tracker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.3,
    discount: 20
  },
  // Sports products
  {
    id: 9,
    name: "Professional Basketball",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.7,
    discount: 0
  },
  {
    id: 10,
    name: "Tennis Racket Pro",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1617083934551-ac1be4d31293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.5,
    discount: 10
  },
  {
    id: 11,
    name: "Yoga Mat Premium",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.8,
    discount: 0
  },
  {
    id: 12,
    name: "Mountain Bike Helmet",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1573459350645-8e3c19d428c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.9,
    discount: 5
  },
  {
    id: 13,
    name: "Swimming Goggles Pro",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.4,
    discount: 0
  },
  {
    id: 14,
    name: "Golf Club Set",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.7,
    discount: 15
  },
  {
    id: 15,
    name: "Camping Tent 4-Person",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.6,
    discount: 0
  },
  {
    id: 16,
    name: "Dumbbell Set 20kg",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    rating: 4.8,
    discount: 10
  },
  // Electronics products
  {
    id: 17,
    name: "4K Ultra HD TV",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.6,
    discount: 12
  },
  {
    id: 18,
    name: "Gaming Laptop",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.7,
    discount: 8
  },
  {
    id: 19,
    name: "Smart Home Speaker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.4,
    discount: 0
  },
  {
    id: 20,
    name: "Digital Camera DSLR",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    rating: 4.8,
    discount: 15
  },
  // Fashion products
  {
    id: 21,
    name: "Summer Floral Dress",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.6,
    discount: 10
  },
  {
    id: 22,
    name: "Men's Slim-Fit Suit",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.8,
    discount: 0
  },
  {
    id: 23,
    name: "Leather Ankle Boots",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.5,
    discount: 5
  },
  {
    id: 24,
    name: "Vintage Sunglasses",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Fashion",
    rating: 4.3,
    discount: 0
  },
  // Home & Kitchen products
  {
    id: 25,
    name: "Stand Mixer Professional",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1594222082006-72d1cb742711?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.9,
    discount: 12
  },
  {
    id: 26,
    name: "Egyptian Cotton Bedding Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.7,
    discount: 0
  },
  {
    id: 27,
    name: "Minimalist Coffee Table",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1534083264897-aeabfc7daf8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.6,
    discount: 15
  },
  {
    id: 28,
    name: "Smart Refrigerator",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    rating: 4.8,
    discount: 10
  },
  // Beauty products
  {
    id: 29,
    name: "Luxury Skincare Set",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.7,
    discount: 0
  },
  {
    id: 30,
    name: "Professional Hair Dryer",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1522338140642-f48f96c2a682?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.5,
    discount: 8
  },
  {
    id: 31,
    name: "Organic Makeup Palette",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1596704017254-9a89b8a97b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.6,
    discount: 0
  },
  {
    id: 32,
    name: "Essential Oil Diffuser",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1608571423902-abb99968a693?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Beauty",
    rating: 4.4,
    discount: 15
  },
  // Collectibles products
  {
    id: 33,
    name: "Vintage Comic Book",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Collectibles",
    rating: 4.9,
    discount: 0
  },
  {
    id: 34,
    name: "Limited Edition Figurine",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Collectibles",
    rating: 4.8,
    discount: 0
  },
  {
    id: 35,
    name: "Antique Pocket Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Collectibles",
    rating: 4.7,
    discount: 5
  },
  {
    id: 36,
    name: "Rare Vinyl Record",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1603058695949-ec9187ef2469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Collectibles",
    rating: 4.6,
    discount: 0
  },
];

// Initial user listings (simulating items people have already uploaded)
const initialUserListings = [
  {
    id: 101,
    name: "Vintage Record Player",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1594759845217-e24e0b91e468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    seller: "vintagecollector",
    location: "Portland, OR",
    condition: "Used - Good",
    rating: 4.2,
    listed: "2 days ago",
    bids: 3,
    endTime: "3d 5h"
  },
  {
    id: 102,
    name: "Mountain Bike - Trek 820",
    price: 350.00,
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
    seller: "cyclingpro",
    location: "Denver, CO",
    condition: "Used - Very Good",
    rating: 4.7,
    listed: "5 hours ago",
    bids: 5,
    endTime: "4d 12h"
  },
  {
    id: 103,
    name: "Antique Wooden Desk",
    price: 220.00,
    image: "https://images.unsplash.com/photo-1499933374294-4584851497cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home & Kitchen",
    seller: "antiquestore123",
    location: "Chicago, IL",
    condition: "Used - Excellent",
    rating: 4.9,
    listed: "1 day ago",
    bids: 7,
    endTime: "2d 8h"
  },
  {
    id: 104,
    name: "Canon EOS Rebel T7 Camera",
    price: 410.00,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    seller: "photoguy87",
    location: "Miami, FL",
    condition: "Used - Like New",
    rating: 4.8,
    listed: "3 hours ago",
    bids: 9,
    endTime: "1d 14h"
  }
];

// Categories to match the Figma design
const categories = [
  { id: 1, name: "전자기기", icon: "💻" },
  { id: 2, name: "패션", icon: "👕" },
  { id: 3, name: "홈 & 키친", icon: "🏠" },
  { id: 4, name: "스포츠", icon: "⚽" },
  { id: 5, name: "뷰티", icon: "💄" },
  { id: 6, name: "수집품", icon: "🧸" },
  { id: 7, name: "쥬얼리 & 시계", icon: "💍" },
  { id: 8, name: "비즈니스", icon: "💼" }
];

// Subcategories for each category
const sportsSubcategories = [
  { id: 1, name: "Team Sports", count: 24 },
  { id: 2, name: "Fitness", count: 36 },
  { id: 3, name: "Outdoor Recreation", count: 18 },
  { id: 4, name: "Water Sports", count: 12 },
  { id: 5, name: "Winter Sports", count: 9 },
  { id: 6, name: "Cycling", count: 15 }
];

const electronicsSubcategories = [
  { id: 1, name: "Smartphones", count: 42 },
  { id: 2, name: "Laptops & Computers", count: 38 },
  { id: 3, name: "Audio Equipment", count: 25 },
  { id: 4, name: "Cameras", count: 19 },
  { id: 5, name: "Wearable Tech", count: 27 },
  { id: 6, name: "Smart Home", count: 22 }
];

const fashionSubcategories = [
  { id: 1, name: "Women's Clothing", count: 48 },
  { id: 2, name: "Men's Clothing", count: 41 },
  { id: 3, name: "Shoes", count: 35 },
  { id: 4, name: "Accessories", count: 29 },
  { id: 5, name: "Designer Brands", count: 18 },
  { id: 6, name: "Vintage & Second-hand", count: 22 }
];

const homeKitchenSubcategories = [
  { id: 1, name: "Furniture", count: 32 },
  { id: 2, name: "Kitchen Appliances", count: 28 },
  { id: 3, name: "Bedding & Linens", count: 21 },
  { id: 4, name: "Home Decor", count: 36 },
  { id: 5, name: "Storage & Organization", count: 19 },
  { id: 6, name: "Cookware & Bakeware", count: 24 }
];

const beautySubcategories = [
  { id: 1, name: "Skincare", count: 31 },
  { id: 2, name: "Makeup", count: 42 },
  { id: 3, name: "Hair Care", count: 26 },
  { id: 4, name: "Fragrances", count: 19 },
  { id: 5, name: "Tools & Accessories", count: 22 },
  { id: 6, name: "Natural & Organic", count: 15 }
];

const collectiblesSubcategories = [
  { id: 1, name: "Comics & Graphic Novels", count: 18 },
  { id: 2, name: "Trading Cards", count: 24 },
  { id: 3, name: "Figurines & Statues", count: 21 },
  { id: 4, name: "Vintage Memorabilia", count: 16 },
  { id: 5, name: "Coins & Currency", count: 13 },
  { id: 6, name: "Antiques", count: 19 }
];

// Reusable Unsplash fallback helper
function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==" alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}

// Girl illustration component (desktop & mobile)
function GirlDesktop() {
  return (
    <img
      alt=""
      src={imgGirl}
      className="h-80 w-auto pointer-events-none select-none"
      data-name="girl-desktop"
    />
  );
}

function GirlMobile() {
  return (
    <img
      alt=""
      src={imgGirl}
      className="h-64 w-auto mx-auto pointer-events-none select-none"
      data-name="girl-mobile"
    />
  );
}

function Girl() {
  const { width } = useActiveBreakpoint();
  if (width < 1125) {
    return <GirlMobile />;
  }
  return <GirlDesktop />;
}

// Product Card Component to match Figma design
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <ImageWithFallback 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
        <button className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow">
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-sm text-gray-500">{product.category}</h3>
        <h2 className="font-medium text-gray-800 mb-2 truncate">{product.name}</h2>
        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900">
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        <button className="mt-3 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors">
          장바구니에 담기
        </button>
      </div>
    </div>
  );
}

// User Listing Card Component - Similar to eBay style
function UserListingCard({ listing }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <ImageWithFallback 
          src={listing.image} 
          alt={listing.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
          <div className="flex justify-between items-center">
            <span className="text-white text-xs font-medium">{listing.listed}</span>
            <span className="text-white text-xs font-medium">{listing.bids} bids</span>
          </div>
        </div>
        <button className="absolute top-2 left-2 bg-white p-1.5 rounded-full shadow">
          <Heart size={18} className="text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm text-gray-500">{listing.category}</h3>
          <span className="text-xs font-semibold text-blue-600">Ends in {listing.endTime}</span>
        </div>
        <h2 className="font-medium text-gray-800 mb-2 truncate">{listing.name}</h2>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900">${listing.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">{listing.location}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 mb-3">
          <User size={14} className="text-gray-400 mr-1" />
          <span className="text-xs text-gray-500">{listing.seller}</span>
          <span className="mx-1 text-gray-300">•</span>
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs text-gray-600 ml-1">{listing.rating}</span>
        </div>
        <button className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors">
          입찰하기
        </button>
      </div>
    </div>
  );
}

// Sell Item Form Component
function SellItemForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    condition: "New",
    description: "",
    location: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new listing object
    const newListing = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      image: imagePreview || "https://images.unsplash.com/photo-1553531384-cc64ac80f931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      category: formData.category,
      seller: "You",
      location: formData.location || "Your Location",
      condition: formData.condition,
      rating: 5.0,
      listed: "Just now",
      bids: 0,
      endTime: "7d 0h"
    };
    
    onSubmit(newListing);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">List an Item for Sale</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Item Photo</label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Item preview" 
                    className="mx-auto h-48 object-contain" 
                  />
                  <button 
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview(null);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Click to upload a photo</p>
                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG, or GIF up to 5MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          {/* Item Details */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What are you selling?"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">Category</label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-gray-700 text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="condition" className="block text-gray-700 text-sm font-medium mb-2">Condition</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>New</option>
                <option>Used - Like New</option>
                <option>Used - Excellent</option>
                <option>Used - Good</option>
                <option>Used - Fair</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City, State"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your item..."
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
          >
            List Item
          </button>
        </form>
      </div>
    </div>
  );
}

// Hero Carousel Component matching Figma design
function HeroCarousel({ heroGirlImage = "" }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: "가을 맞이 신상품",
      description: "계절에 맞는 트렌디한 신상품들을 만나보세요.",
      // Replaced unreachable image with working Unsplash photo
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
      buttonText: "구매하러 가기"
    },
    {
      id: 2,
      title: "최신 전자기기 모음",
      description: "최저가 할인 받으러 가기",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      buttonText: "구경하기"
    },
    {
      id: 3,
      title: "오늘의 추천 가구",
      description: "전세계에서 오는 디자이너 콜렉션",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      buttonText: "구경하기"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[300px] md:h-[380px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center text-center md:text-left text-white z-20 px-4">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-6 max-w-xl mx-auto md:mx-0">{slide.description}</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-8 rounded-md transition-colors">
                {slide.buttonText}
              </button>
            </div>
            {heroGirlImage && (
              <div className="hidden md:block flex-1 h-full relative">
                <ImageWithFallback src={heroGirlImage} alt="Hero girl" className="absolute right-0 top-0 h-full w-auto object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-30 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 z-30 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-white" />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Header Component
function Header({ searchQuery, setSearchQuery, cartCount, isMenuOpen, toggleMenu }) {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Site Logo */}
          <div className="flex-shrink-0 w-40 h-10 mr-6" aria-label="site-logo">
            <Logo />
          </div>

          {/* Links next to logo */}
          <nav className="hidden md:flex items-center gap-6 mr-6">
            <a
              href="#watchlist"
              className="font-medium text-gray-700 hover:text-yellow-600 whitespace-nowrap"
            >
              관심목록
            </a>
            <a
              href="#help"
              className="font-medium text-gray-700 hover:text-yellow-600 whitespace-nowrap"
            >
              도움말
            </a>
          </nav>

          {/* Center Search Bar */}
          <div className="flex-1 px-4 hidden md:block">
            <div className="relative max-w-md mx-auto">
              <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="상품을 검색하세요..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>

          {/* Right section: nav + cart/menu */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#mypage"
                className="font-medium text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                마이페이지
              </a>
              <a
                href="#signup"
                className="font-medium text-gray-700 hover:text-yellow-600 whitespace-nowrap"
              >
                회원가입
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center text-white">
                    {cartCount}
                  </span>
                )}
              </button>
              <button onClick={toggleMenu} className="md:hidden">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="pt-12 pb-6 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-gray-300 mb-4">
              Your one-stop destination for all your shopping needs. Quality products, competitive prices, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">All Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Featured</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Community Marketplace</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Track Order</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Sustainability</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Category Banner Component (Generic)
function CategoryBanner({ title, description, backgroundImage }) {
  return (
    <div className="relative h-[200px] md:h-[250px] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <ImageWithFallback
        src={backgroundImage}
        alt={`${title} Banner`}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center text-center text-white z-20 px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl max-w-xl mx-auto">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Generic Category Page Component
function CategoryPage({ 
  categoryName, 
  subcategories, 
  bannerImage, 
  bannerDescription 
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(2);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products by category
  const categoryProducts = products.filter(product => product.category === categoryName);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubcategory = (subcategoryId) => {
    if (selectedSubcategories.includes(subcategoryId)) {
      setSelectedSubcategories(selectedSubcategories.filter(id => id !== subcategoryId));
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
    }
  };

  // Sort products based on selection
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // featured - keep original order
    }
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white text-gray-900">
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <main>
        {/* Category Banner */}
        <CategoryBanner 
          title={categoryName} 
          description={bannerDescription}
          backgroundImage={bannerImage}
        />

        {/* Filters and Products */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md w-full justify-between"
              >
                <span className="font-medium">필터</span>
                <Filter size={18} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Sidebar Filters */}
              <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Categories</h3>
                    <ul className="space-y-2">
                      {subcategories.map(subcat => (
                        <li key={subcat.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`subcat-${subcat.id}`}
                            checked={selectedSubcategories.includes(subcat.id)}
                            onChange={() => toggleSubcategory(subcat.id)}
                            className="mr-2"
                          />
                          <label htmlFor={`subcat-${subcat.id}`} className="flex-1 cursor-pointer">
                            {subcat.name}
                          </label>
                          <span className="text-gray-500 text-sm">({subcat.count})</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-3">Price Range</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Min"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Max"
                      />
                    </div>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors w-full">
                      Apply
                    </button>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">Customer Rating</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map(rating => (
                        <div key={rating} className="flex items-center">
                          <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                          <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-400"}>★</span>
                            ))}
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="md:w-3/4">
                {/* Sort Controls */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">{sortedProducts.length} results</p>
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-gray-600 whitespace-nowrap">Sort by:</label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Customer Rating</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Message if no products */}
                {sortedProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No products found in this category.</p>
                    <p className="text-gray-400 mt-2">Try adjusting your filters or check back later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Sports Category Page (using the generic component)
function SportsPage() {
  return (
    <CategoryPage 
      categoryName="Sports"
      subcategories={sportsSubcategories}
      bannerImage={imgSportsBanner}
      bannerDescription="Equipment and gear for every athlete and adventure"
    />
  );
}

// Electronics Category Page
function ElectronicsPage() {
  return (
    <CategoryPage 
      categoryName="전자기기"
      subcategories={electronicsSubcategories}
      bannerImage="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
      bannerDescription="The latest gadgets and tech to keep you connected"
    />
  );
}

// Fashion Category Page
function FashionPage() {
  return (
    <CategoryPage 
      categoryName="Fashion"
      subcategories={fashionSubcategories}
      bannerImage="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
      bannerDescription="Discover the latest trends and styles for every season"
    />
  );
}

// Home & Kitchen Category Page
function HomeKitchenPage() {
  return (
    <CategoryPage 
      categoryName="Home & Kitchen"
      subcategories={homeKitchenSubcategories}
      bannerImage="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
      bannerDescription="Everything you need to make your house a home"
    />
  );
}

// Beauty Category Page
function BeautyPage() {
  return (
    <CategoryPage 
      categoryName="Beauty"
      subcategories={beautySubcategories}
      bannerImage="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
      bannerDescription="Premium skincare, makeup, and beauty essentials"
    />
  );
}

// Collectibles Category Page
function CollectiblesPage() {
  return (
    <CategoryPage 
      categoryName="Collectibles"
      subcategories={collectiblesSubcategories}
      bannerImage="https://images.unsplash.com/photo-1511108690759-009324a90311?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80"
      bannerDescription="Rare finds and treasures for collectors and enthusiasts"
    />
  );
}

// HomePage Component
function HomePage({ primaryColor, accentColor, darkMode, showUserListings, heroGirlImage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSellForm, setShowSellForm] = useState(false);
  const [userListings, setUserListings] = useState(initialUserListings);
  const [currentPage, setCurrentPage] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAddNewListing = (newListing) => {
    setUserListings([newListing, ...userListings]);
    setShowSellForm(false);
  };

  // Navigate to category page when clicking on a category
  // Fixed: Direct mapping from category name to page identifiers
  const handleCategoryClick = (categoryName) => {
    // Map from category names directly to page identifiers
    const categoryMap = {
      "Sports": "sports",
      "Beauty": "beauty",
      "Collectibles": "collectibles",
      "Electronics": "electronics",
      "Fashion": "fashion",
      "Home & Kitchen": "home-kitchen" // Fixed this to avoid using &
    };
    
    // Get the page identifier from the map
    const pageId = categoryMap[categoryName];
    
    // Set the current page directly
    if (pageId) {
      setCurrentPage(pageId);
    }
  };

  // Debug which page we're on
  useEffect(() => {
    console.log("Current page:", currentPage);
  }, [currentPage]);

  // Render the appropriate page based on currentPage state
  // Fixed: Simplified conditional rendering with clear page identifiers
  switch (currentPage) {
    case "sports":
      return <SportsPage />;
    case "electronics":
      return <ElectronicsPage />;
    case "fashion":
      return <FashionPage />;
    case "home-kitchen": // Fixed this to match handleCategoryClick mapping
      return <HomeKitchenPage />;
    case "beauty":
      return <BeautyPage />;
    case "collectibles":
      return <CollectiblesPage />;
    default:
      // Home page rendering continues below
      break;
  }

  return (
    <div className={`flex flex-col h-full overflow-y-auto ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />

      <main>
        {/* Hero Section with optional girl image */}
        <section>
          <HeroCarousel heroGirlImage={heroGirlImage} />
        </section>

        {/* Categories Section - Matching Figma */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">카테고리별로 쇼핑하기</h2>
            {/* Flex row: image (left) + category grid (right) */}
            <div className="flex flex-col md:flex-row items-center md:items-start">
              {/* Girl image without square frame */}
              <div className="hidden md:block flex-shrink-0 mr-8">
                <Girl />
              </div>

              {/* Two-row, three-column category grid (right aligned) */}
              <div className="grid grid-cols-3 gap-8 place-items-center max-w-sm ml-auto md:ml-0 md:mr-8">
              {[
                "스포츠",
                "뷰티",
                "수집품",
                "전자기기",
                "패션",
                "홈 & 키친",
              ].map((catName) => {
                const category = categories.find((c) => c.name === catName);
                if (!category) return null;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex flex-col items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-all w-28 h-28"
                  >
                    <span className="text-3xl mb-2">{category.icon}</span>
                    <span className="font-medium text-sm text-center whitespace-pre-line">
                      {category.name}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </section>

        {/* Spacer below Categories */}
        <section aria-label="custom-blank-space" className="w-full h-12 md:h-20 lg:h-24" />

        {/* Featured Products - Matching Figma */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">추천 상품</h2>
              <a href="#" className="text-blue-500 font-medium flex items-center hover:underline">
                전체 보기 <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* User Listings Section (eBay-style) */}
        {showUserListings && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">중고 장터</h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowSellForm(true)}
                    className="flex items-center gap-1 text-white font-medium bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                  >
                    <Plus size={16} /> 상품 판매하기
                  </button>
                  <a href="#" className="text-blue-500 font-medium flex items-center hover:underline">
                    전체 보기 <ChevronRight size={16} />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {userListings.map((listing) => (
                  <UserListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* New Arrivals */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">슈퍼 샐러</h2>
              <a href="#" className="text-blue-500 font-medium flex items-center hover:underline">
                전체 보기 <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.slice(4, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Sell Item Form Modal */}
      {showSellForm && (
        <SellItemForm 
          onSubmit={handleAddNewListing} 
          onClose={() => setShowSellForm(false)} 
        />
      )}
    </div>
  );
}

// Main Component
export default function Layer({ primaryColor = "#3b82f6", accentColor = "#ef4444", darkMode = false, showUserListings = true, heroGirlImage = "" }) {
  return (
    <HomePage 
      primaryColor={primaryColor}
      accentColor={accentColor}
      darkMode={darkMode}
      showUserListings={showUserListings}
      heroGirlImage={heroGirlImage}
    />
  );
}

defineProperties(Layer, {
  primaryColor: {
    label: "Primary Color",
    type: "string",
    defaultValue: "#3b82f6"
  },
  accentColor: {
    label: "Accent Color",
    type: "string",
    defaultValue: "#ef4444"
  },
  darkMode: {
    label: "Dark Mode",
    type: "boolean",
    defaultValue: false
  },
  showUserListings: {
    label: "Show User Listings",
    type: "boolean",
    defaultValue: true
  },
  heroGirlImage: {
    label: "Hero Girl Image URL",
    type: "string",
    defaultValue: ""
  }
});
