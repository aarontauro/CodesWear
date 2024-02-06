import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Checkout = ({ subTotal, cart, clearCart, profile }) => {
    const [data, setData] = useState({ name: '', address: '', mobile: '', city: '', state: '', pincode: '', email: '' })
    const [disabled, setDisabled] = useState(true)
    const router = useRouter()

    const handleChange = async (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

        if (data.name.length >= 3 && data.address.length >= 10 && data.mobile.length >= 9 && data.city.length >= 3 && data.state.length >= 3 && data.pincode.length >= 5) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        else if (!localStorage.getItem('cart')) {
            router.push('/')
        }
        else{
                setData({ name: profile.name, address: profile.address, mobile: profile.mobile, city: profile.city, state: profile.state, pincode: profile.pincode, email: profile.email })
                setDisabled(false)
        }
    }, [router.query, profile])

    const placeOrder = async (e) => {
        e.preventDefault()
        let oid = Math.floor(Math.random() * Date.now())
        const body = { cart, subTotal, oid, ...data, token: localStorage.getItem('token'), products: localStorage.getItem('cart') }

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const response = await res.json()
        setData({ name: '', address: '', mobile: '', city: '', state: '', pincode: '', email: '' })

        if (response.success === false) {
            toast.error(response.message, {
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

        if (response.success === true) {
            localStorage.removeItem('cart')
            clearCart()

            toast.success('Order successfully placed!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            router.push(`/order?id=${response.order._id}`) 
        }
    }

    return (
        <div>
            <Head>
                <title>CodesWear- Checkout</title>
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
            <div className="grid lg:grid-cols-3 gap-4 px-4 py-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">Order Summary</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-2">
                                {Object.keys(cart).map((item) => {
                                    return (
                                        <div className="flex justify-between" key={item}>
                                            <span>{cart[item].name} (x{cart[item].qty})</span>
                                            <span>₹{cart[item].price}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">Shipping Information</h3>
                        </div>
                        <div className="p-6">
                            <form className="space-y-4">
                                <input placeholder="Name" className="border rounded w-full p-2" type="text" required name='name' value={data.name} onChange={handleChange} />
                                <input placeholder="Address" className="border rounded w-full p-2" type="text" required name='address' value={data.address} onChange={handleChange} />
                                <input placeholder="Mobile" className="border rounded w-full p-2" type="tel" required name='mobile' value={data.mobile} onChange={handleChange} />
                                <input placeholder="Email" className="border rounded w-full p-2" type="email" required name='email' value={data.email} onChange={handleChange} />
                                <input placeholder="City" className="border rounded w-full p-2" type="text" required name='city' value={data.city} onChange={handleChange} />
                                <input placeholder="State" className="border rounded w-full p-2" type="text" required name='state' value={data.state} onChange={handleChange} />
                                <input placeholder="Pin Code" className="border rounded w-full p-2" type="text" required name='pincode' value={data.pincode} onChange={handleChange} />
                            </form>
                        </div>
                    </div>
                    <div>
                        {disabled && <button disabled onClick={placeOrder} className="bg-pink-300 border-0 py-2 px-8 focus:outline-none  rounded-md text-lg text-white ml-3">Place Order</button>}
                        {(!disabled && cart) && <button onClick={placeOrder} className="bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded-md text-lg text-white ml-3">Place Order</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
