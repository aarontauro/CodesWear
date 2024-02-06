import connectToMongo from '@/middleware/mongoose'
import React, { useEffect } from 'react'
import Order from '@/models/Order'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

const MyOrder = ({ order }) => {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
  }, [router.query])

  return (
    <div>
      <Head>
        <title>CodesWear- Your Order</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
              <h2 className="text-sm title-font text-gray-500">Your Order has been successfully placed</h2>
              <div className="flex mb-4">
                <a className="flex-grow py-2 text-lg px-1 text-center">Item Description</a>
                <a className="flex-grow py-2 text-lg px-1 text-center">Quantity</a>
                <a className="flex-grow py-2 text-lg px-1 text-center">Item Total</a>
              </div>
              {Object.keys(order.products).map((item) => {
                return (
                  <div key={item} className="flex border-t border-gray-200 py-2">
                    <span className="text-gray-500">{order.products[item].name}</span>
                    <span className="text-gray-500 ml-auto">{order.products[item].qty}</span>
                    <span className="ml-auto text-gray-900">₹{order.products[item].price}</span>
                  </div>
                )
              })}
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}.00</span>
                <button className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"><Link href={'/orders'}>Track Order</Link></button>
              </div>
            </div>
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  connectToMongo()

  const order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order))
    },
  }
}

export default MyOrder
