import React from 'react'
import connectToMongo from '@/middleware/mongoose';
import Product from '@/models/Product';
import Link from 'next/link';
import Head from 'next/head';

const Mugs = ({ products }) => {
    return (
        <div>
            <Head>
                <title>CodesWear- Mugs</title>
            </Head>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    {products && <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((item) => {
                            return (
                                <Link href={`/products/${item.slug}`} className="group shadow-lg" key={item.slug}>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img src={item.img} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75 " />
                                    </div>
                                    <div className="mt-4 ml-2">
                                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                                        <p className="mt-1">₹{item.price}</p>
                                    </div>
                                </Link>)
                        })}
                    </div>}
                </div>
            </div>

        </div>
    )
}

export async function getServerSideProps() {
    connectToMongo();

    const products = await Product.find({ category: "mugs" })

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}

export default Mugs