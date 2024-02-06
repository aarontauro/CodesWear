import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiFillCloseCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from 'next/router';

const Navbar = ({ handleLogout, user, clearCart, subTotal, cart, removeFromCart, addToCart }) => {
  const ref = useRef();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/checkout' || router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/forgot' || router.pathname === '/account' || router.pathname === '/orders') {
      close();
    }
  }, [router.query])

  const toggleCart = () => {
    if (ref.current.classList.contains('hidden')) {
      open();
    }
    else {
      close();
    }
  }

  const open = () => {
    ref.current.classList.remove('hidden');
  };

  const close = () => {
    ref.current.classList.add('hidden');
  };

  return (
    <>
      <div className="sticky top-0 z-50">
        <header className="text-gray-600 body-font my-1 shadow-lg bg-white">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href='/'>
              <Image src="/logo.png" alt="logo" width={200} height={150} />
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
              <Link className={`mr-5 hover:text-pink-600 font-bold ${router.pathname === '/tshirts' ? 'text-pink-600' : ''}`} href={'/tshirts'}>Tshirts</Link>
              <Link className={`mr-5 hover:text-pink-600 font-bold ${router.pathname === '/hoodies' ? 'text-pink-600' : ''}`} href={'/hoodies'}>Hoodies</Link>
              <Link className={`mr-5 hover:text-pink-600 font-bold ${router.pathname === '/stickers' ? 'text-pink-600' : ''}`} href={'/stickers'}>Stickers</Link>
              <Link className={`mr-5 hover:text-pink-600 font-bold ${router.pathname === '/mugs' ? 'text-pink-600' : ''}`} href={'/mugs'}>Mugs</Link>
            </nav>
            <div className='inline-flex items-center py-1 px-3 focus:outline-none mt-4 md:mt-0 left-0 cursor-pointer'>
              {user.value && <Link className={`text-3xl text-gray-900 font-bold pr-3 hover:text-pink-600 ${router.pathname === '/login' || router.pathname === '/signup' || router.pathname === '/forgot' ? 'text-pink-600' : ''}`} href={'/account'}>
                <MdAccountCircle />
              </Link>}
              {!user.value && <Link href={'/login'} className='bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded-md text-lg mr-3 text-white'>Login</Link>}
              <span className="text-3xl text-gray-900 font-bold hover:text-pink-600">
                <AiOutlineShoppingCart onClick={toggleCart} />
              </span>
              {user.value && <button onClick={handleLogout} className='bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded-md text-lg text-white ml-3'>Logout</button>}
            </div>
          </div>
        </header>
      </div>

      {/* Shopping Cart */}
      <div className="relative z-50 hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true" ref={ref}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" className="relative -m-2 p-2 text-2xl text-pink-600" onClick={toggleCart}>
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <AiFillCloseCircle />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        {Object.keys(cart).length === 0 && <p className='text-center text-2xl'>Your cart is empty</p>}
                        {Object.keys(cart).map((item) => {
                          return (
                            <ul role="list" className="-my-6 divide-y divide-gray-200" key={item}>
                              <li className="flex py-6">

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href="#">{cart[item].name}</a>
                                      </h3>
                                      <p className="ml-4">₹{cart[item].price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{cart[item].variant}, {cart[item].size}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {cart[item].qty}</p>

                                    <div className="flex">
                                      <button type="button" className="font-medium text-xl text-pink-600 hover:text-pink-500" onClick={() => { addToCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant) }}><HiPlusCircle /></button>
                                      <span className='px-3'>{cart[item].qty}</span>
                                      <button type="button" className="font-medium text-xl text-pink-600 hover:text-pink-500" onClick={() => { removeFromCart(item) }}><HiMinusCircle /></button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          )
                        })}


                      </div>
                    </div>
                  </div>

                  {Object.keys(cart) != 0 && <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹{subTotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link href="/checkout" className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700"><span className='text-white px-1'><BsFillBagCheckFill /></span> Checkout</Link>
                    </div>
                    <div className="mt-6">
                      <Link href="#" className="flex items-center justify-center rounded-md border border-transparent bg-pink-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-pink-700" onClick={clearCart}>Clear Cart</Link>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
