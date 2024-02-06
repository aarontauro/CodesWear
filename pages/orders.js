import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

const MyOrders = () => {
    const router = useRouter()
    const [orders, setOrders] = useState([{}])

    const fetchOrders = async () => {
        const token = localStorage.getItem('token')

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getorders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })

        const response = await res.json()
        setOrders(response.orders)
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        else {
            fetchOrders()
        }
    }, [router.query])

    return (
        <div>
            <Head>
                <title>CodesWear- My Orders</title>
            </Head>
            <section className="text-gray-600 body-font min-h-screen">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-20">
                        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">My Orders</h1>
                        {orders.length === 0 && <div className="flex justify-center items-center mt-5">No orders to display</div>}
                    </div>
                    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
                        {orders.length != 0 && <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Order Id</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Amount</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Details</th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item) => (
                                    <tr key={item.orderId}>
                                        <td className="px-4 py-3">#{item.orderId}</td>
                                        <td className="px-4 py-3">{item.email}</td>
                                        <td className="px-4 py-3">₹{item.amount}</td>
                                        <td className="cursor-pointer underline px-4 py-3 text-lg text-gray-900"><Link href={`/order?id=${item._id}`}>details</Link></td>
                                        <td className="w-10 text-center">
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default MyOrders
