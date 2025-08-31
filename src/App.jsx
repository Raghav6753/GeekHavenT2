import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { UserProvider, UserContext } from "./context/UserContext";
import { useContext, useState } from "react";
import HomePage from "./pages/Homeage";
import ProductDetailPage from "./pages/productpage";
import CartSidebar from "./components/cartside";
import Navbar from "./components/Navbar";
import WishlistPage from "./pages/wishlist";
import SellPage from "./pages/sellpage";
import CheckoutPage from "./pages/checkout";
import AuthPage from "./pages/authpage";

const products = [
  {
    id: "1",
    title: "iPhone 14 Pro Max - Space Black 256GB",
    price: 899,
    originalPrice: 1099,
    images: ["/iphone-14-pro-max-space-black.png"],
    seller: { name: "TechDeals Pro", avatar: "/seller-avatar.png", rating: 4.8, reviewCount: 324, joinedDate: "2022", responseTime: "< 1 hour" },
    rating: 4.8,
    reviewCount: 124,
    condition: "Like New",
    category: "Electronics",
    description: "Excellent condition iPhone 14 Pro Max in Space Black.",
  },
  {
    id: "2",
    title: "Nike Air Jordan 1 Retro High OG - Size 10",
    price: 180,
    originalPrice: 220,
    images: ["/nike-air-jordan-1-sneakers.png"],
    seller: { name: "SneakerHub", avatar: "/sneaker-seller-avatar.png", rating: 4.9, reviewCount: 156, joinedDate: "2021", responseTime: "< 2 hours" },
    rating: 4.9,
    reviewCount: 89,
    condition: "New",
    category: "Fashion",
    description: "Brand new Nike Air Jordan 1 Retro High OG.",
  },
  {
    id: "3",
    title: "MacBook Air M2 13-inch - Silver",
    price: 1050,
    originalPrice: 1199,
    images: ["/macbook-air-m2-silver-laptop.png"],
    seller: { name: "AppleReseller", avatar: "", rating: 4.7, reviewCount: 67, joinedDate: "2023", responseTime: "< 1 hour" },
    rating: 4.7,
    reviewCount: 67,
    condition: "Like New",
    category: "Electronics",
    description: "MacBook Air M2 13-inch Silver.",
  },
  {
    id: "4",
    title: "Vintage Leather Jacket - Brown Medium",
    price: 85,
    originalPrice: 150,
    images: ["/vintage-brown-leather-jacket.png"],
    seller: { name: "VintageStyle", avatar: "", rating: 4.6, reviewCount: 43, joinedDate: "2020", responseTime: "< 3 hours" },
    rating: 4.6,
    reviewCount: 43,
    condition: "Good",
    category: "Fashion",
    description: "Vintage Leather Jacket Brown Medium.",
  },
  {
    id: "5",
    title: "PlayStation 5 Console + Controller",
    price: 450,
    originalPrice: 499,
    images: ["/playstation-5-console-white.png"],
    seller: { name: "GameCentral", avatar: "", rating: 4.9, reviewCount: 156, joinedDate: "2021", responseTime: "< 2 hours" },
    rating: 4.9,
    reviewCount: 156,
    condition: "Like New",
    category: "Electronics",
    description: "PlayStation 5 Console + Controller.",
  },
  {
    id: "6",
    title: "Designer Handbag - Louis Vuitton Style",
    price: 120,
    originalPrice: 200,
    images: ["/designer-handbag-luxury-brown.png"],
    seller: { name: "LuxuryFinds", avatar: "", rating: 4.5, reviewCount: 78, joinedDate: "2022", responseTime: "< 4 hours" },
    rating: 4.5,
    reviewCount: 78,
    condition: "Good",
    category: "Fashion",
    description: "Designer Handbag Louis Vuitton Style.",
  },
];

const App = () => {
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isAuthenticated } = useContext(UserContext);

  const handleAddToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <Navbar
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={() => navigate("/wishlist")}
      />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              cartItems={cartItems}
              setCartItems={setCartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              onAddToWishlist={handleAddToWishlist}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              products={products}
              cartItems={cartItems}
              setCartItems={setCartItems}
              setCartOpen={setCartOpen}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              onAddToWishlist={handleAddToWishlist}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <WishlistPage
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
            />
          }
        />
        <Route
          path="/search"
          element={
            <HomePage
              products={products}
              cartItems={cartItems}
              setCartItems={setCartItems}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
              wishlistItems={wishlistItems}
              setWishlistItems={setWishlistItems}
              onAddToWishlist={handleAddToWishlist}
            />
          }
        />
        <Route
          path="/sell"
          element={<SellPage />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cartItems={cartItems} setCartItems={setCartItems} />}
        />
      </Routes>
    </>
  );
};

export default App;
