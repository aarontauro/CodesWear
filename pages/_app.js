import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState();
  const [user, setUser] = useState({ value: null });
  const router = useRouter();
  const [progress, setProgress] = useState(0)
  const [profile, setProfile] = useState({ name: '', address: '', mobile: '', email: '', password: '', city: '', state: '', pincode: '' })

  useEffect(() => {
    try {
      router.events.on('routeChangeStart', () => setProgress(40))
      router.events.on('routeChangeComplete', () => setProgress(100))

      if (localStorage.getItem('cart')) {
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      console.error(error)
    }

    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
      setUser({ value: token })
    }
  }, [router.query])

  const saveCart = (myCart) => {
    localStorage.setItem('cart', JSON.stringify(myCart))
    let subt = 0
    const keys = Object.keys(myCart)

    for (let index = 0; index < keys.length; index++) {
      subt += myCart[keys[index]].qty * myCart[keys[index]].price
    }

    setSubTotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    const newCart = cart;

    if (itemCode in cart) {
      newCart[itemCode].qty += qty
    }
    else {
      newCart[itemCode] = {
        qty: qty,
        price: price,
        name: name,
        size: size,
        variant: variant
      }
    }

    setCart(newCart)
    saveCart(newCart)

    toast.success('Item added to cart!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const clearCart = () => {
    setCart({})
    localStorage.removeItem('cart')

    toast.success('Cart cleared!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const removeFromCart = (itemCode) => {
    const newCart = cart

    if (itemCode in cart) {
      newCart[itemCode].qty -= 1
    }

    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)

    toast.success('Item removed from cart!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const buyNow = (itemCode, qty, price, name, size, variant) => {
    const newCart = {}
    newCart[itemCode] = { qty, price, name, size, variant }

    setCart(newCart)
    saveCart(newCart)

    router.push('/checkout')
  }

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setUser({ value: null })
    router.push('/')

    toast.success('Logged out successfully!', {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const fetchUser = async () => {
    const token = localStorage.getItem('token')

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    })

    const response = await res.json()
    setProfile({ name: response.user.name, address: response.user.address, mobile: response.user.mobile, email: response.user.email, password: response.user.password, city: response.user.city, state: response.user.state, pincode: response.user.pincode })
}

  return <>
    <ToastContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <LoadingBar  progress={progress} color='#ff3399' height={3}
        onLoaderFinished={() => setProgress(0)} waitingTime={400}/> 
    <Navbar user={user} handleLogout={handleLogout} cart={cart} subTotal={subTotal} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} />
    <Component fetchUser={fetchUser} profile={profile} user={user} buyNow={buyNow} cart={cart} subTotal={subTotal} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} {...pageProps} />
    {router.pathname !== '/account' && <Footer />}
  </>
}
