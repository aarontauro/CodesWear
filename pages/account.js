import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Head from 'next/head'

const Account = () => {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    }, [router.query])

    return (
        <div>
            <Head>
                <title>CodesWear- Profile</title>
            </Head>
            <div className="mt-10 mx-auto rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl" data-v0-t="card">
                <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-200">
                    <h3 className="hover:text-pink-600 text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"><Link href={'/profile'}>My Account</Link></h3></div>
                <div className="flex flex-col space-y-1.5 p-6 border-b border-gray-200">
                    <h3 className="hover:text-pink-600 text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"><Link href={'/orders'}>My Orders</Link></h3>
                </div>
            </div>
        </div>
    )
}

export default Account
