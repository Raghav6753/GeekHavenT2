import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/UserContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { SeedProvider } from './context/SeedContext.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <SeedProvider seed={"035"}>
                <App />
              </SeedProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
