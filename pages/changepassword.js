import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = ({ profile }) => {
    const router = useRouter()
    const [data, setData] = useState({ password: '', npassword: '', cpassword: '' })

    useEffect(() => {
        if (!localStorage.getItem('token')) {
          router.push('/login')
        }
    }, [router.query])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/changepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, profile })
        })
        const response = await res.json()
        if (response.success) {
            toast.success(response.message, {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setData({ password: '', npassword: '', cpassword: '' })
            router.push('/profile')
        } else {
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
            setData({ password: '', npassword: '', cpassword: '' })
        }
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

  return (
    <div>
            <Head>
                <title>CodesWear- Change Password</title>
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
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="/codeswearcircle.png" alt="Your Company" style={{ height: '6rem' }} />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Change Password</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Enter Your Password</label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" required className="px-2  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" value={data.password} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="npassword" name="npassword" type="password" autoComplete="current-password" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" value={data.npassword} onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="cpassword" name="cpassword" type="password" autoComplete="current-password" required className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" value={data.cpassword} onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ChangePassword
