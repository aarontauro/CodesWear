import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'
import Link from 'next/link';

const Profile = ({ profile, fetchUser }) => {
    const router = useRouter()
    const [data, setData] = useState({ name: '', address: '', mobile: '', city: '', state: '', pincode: '', email: '', password: '' })
    const [disabled, setDisabled] = useState(true)

    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value })
        setDisabled(false)
    }

    const updateUser = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, token }),
        })
        const response = await res.json()
        if (response.success === true) {
            fetchUser()
            toast.success('Account updated successfully!', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            router.push('/profile')
            setDisabled(true)
        }
        else {
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
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        else {
            setData({ name: profile.name, address: profile.address, mobile: profile.mobile, city: profile.city, state: profile.state, pincode: profile.pincode, email: profile.email, password: profile.password })
        }
    }, [router.query, profile])

    return (
        <div>
            <Head>
                <title>CodesWear- My Profile</title>
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
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl mx-auto mt-5" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">User Account</h3>
                    <p className="text-sm text-muted-foreground">Update your account information.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="name"
                            type='text'
                            value={data.name}
                            onChange={handleChange}
                            fdprocessedid="fteemd"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            type="email"
                            readOnly={true}
                            value={data.email}
                            onChange={e => setData(prevData => ({ ...prevData, email: e.target.value }))}
                            fdprocessedid="z9hqe5"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="password"
                            type="password"
                            readOnly={true}
                            onChange={e => setData(prevData => ({ ...prevData, password: e.target.value }))}
                            value={data.password}
                            fdprocessedid="cpy1es"
                        />
                        <Link className='text-pink-500 hover:text-pink-600 ml-1' href={'/changepassword'}>Change Password?</Link>
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="mobile"
                        >
                            Mobile
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="mobile"
                            type="tel"
                            value={data.mobile}
                            onChange={handleChange}
                            fdprocessedid="qenvtf"
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="address"
                        >
                            Address (Default)
                        </label>
                        <textarea
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                            id="address"
                            value={data.address}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="state"
                            >
                                State
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="state"
                                type='text'
                                value={data.state}
                                onChange={handleChange}
                                fdprocessedid="q5kxoq"
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="city"
                            >
                                City
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="city"
                                type='text'
                                value={data.city}
                                onChange={handleChange}
                                fdprocessedid="zvwpe"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="pincode"
                        >
                            Pincode
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="pincode"
                            type='tel'
                            value={data.pincode}
                            onChange={handleChange}
                            fdprocessedid="oxo1n6"
                        />
                    </div>
                </div>
                <div className="flex items-center p-6">
                    <button
                        className="disabled:bg-pink-300 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ml-auto bg-pink-500 hover:bg-pink-600 text-white"
                        fdprocessedid="qb629"
                        onClick={updateUser}
                        disabled={disabled}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
