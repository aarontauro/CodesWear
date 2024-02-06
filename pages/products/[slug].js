import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import connectToMongo from '@/middleware/mongoose'
import Product from '@/models/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error'
import Head from 'next/head'

const Slug = ({ addToCart, product, variants, buyNow, error }) => {
  const router = useRouter()
  const { slug } = router.query
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (product.availableQty <= 0) {
      setDisabled(true)
    }
  }, [color, size])

  const refreshVariant = (color, size) => {
    let url = `http://localhost:3000/products/${variants[color][size]['slug']}`
    window.location.href = url
  }

  if (error) {
    return <Error statusCode={error} />
  }

  return (
    <div>
      <Head>
        <title>CodesWear- Product Page</title>
      </Head>
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
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-top rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
              {product.color && product.size && <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>}
              {!product.color && !product.size && <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>}
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {Object.keys(variants).length !== 1 && <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes('White') && Object.keys(variants['White']).includes(size) && <button onClick={() => { refreshVariant('White', size) }} className={`border-2  rounded-full w-6 h-6 focus:outline-none ${color === 'White' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('Red') && Object.keys(variants['Red']).includes(size) && <button onClick={() => { refreshVariant('Red', size) }} className={`border-2  ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Red' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('Blue') && Object.keys(variants['Blue']).includes(size) && <button onClick={() => { refreshVariant('Blue', size) }} className={`border-2  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Blue' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('Green') && Object.keys(variants['Green']).includes(size) && <button onClick={() => { refreshVariant('Green', size) }} className={`border-2  ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Green' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('Yellow') && Object.keys(variants['Yellow']).includes(size) && <button onClick={() => { refreshVariant('Yellow', size) }} className={`border-2  ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${color === 'Yellow' ? 'border-black' : 'border-gray-300'}`}></button>}
                  {Object.keys(variants).includes('Black') && Object.keys(variants['Black']).includes(size) && <button onClick={() => { refreshVariant('Black', size) }} className={`border-2  ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${color === 'Black' ? 'border-black' : 'border-gray-300'}`}></button>}
                </div>}
                {Object.keys(variants).length !== 1 && <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} className="rounded border appearance-none  py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10" onChange={(e) => { refreshVariant(color, e.target.value) }}>
                      {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                      {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                      {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                      {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                      {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>}
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}.00</span>
                <button disabled={disabled} className="disabled:bg-pink-300 flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={() => { buyNow(slug, 1, product.price, product.title, product.size, product.color) }}>Buy Now
                </button>
                <button disabled={disabled} className="disabled:bg-pink-300 flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={() => { addToCart(slug, 1, product.price, product.title, product.size, product.color) }}>Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  connectToMongo()

  const product = await Product.findOne({ slug: context.params.slug })

  if (!product) {
    return {
      props: {
        error: 404,
        product: '',
        variants: ''
      }
    }
  }

  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlug = {}

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug))
    }
  }
}

export default Slug
