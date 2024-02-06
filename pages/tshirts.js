import React from "react";
import Link from "next/link";
import connectToMongo from "@/middleware/mongoose";
import Product from "@/models/Product";
import Head from "next/head";

const Tshirts = ({ products }) => {
  return (
    <div>
      <Head>
        <title>CodesWear- Tshirts</title>
      </Head>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {Object.keys(products).map((item) => {
              return (
                <Link key={products[item]._id} href={`/products/${products[item].slug}`} className="group shadow-lg">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img src={products[item].img} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
                  </div>
                  <div className="mt-4 ml-2">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="my-1">
                      {products[item].size.includes("S") && <span className="border border-gray-300 px-1 mx-1">S</span>}
                      {products[item].size.includes("M") && <span className="border border-gray-300 px-1 mx-1">M</span>}
                      {products[item].size.includes("L") && <span className="border border-gray-300 px-1 mx-1">L</span>}
                      {products[item].size.includes("XL") && <span className="border border-gray-300 px-1 mx-1">XL</span>}
                      {products[item].size.includes("XXL") && <span className="border border-gray-300 px-1 mx-1">XXL</span>}
                    </div>
                    <div className="my-1">
                      {products[item].color.includes("Red") && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("Blue") && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("Green") && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("Yellow") && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      {products[item].color.includes("Black") && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  connectToMongo();

  const products = await Product.find({ category: "tshirts" })

  const tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color)) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size)) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
      else {
        tshirts[item.title].color = []
        tshirts[item.title].size = []
      }
    }
  }

  return {
    props: {
      products: tshirts,
    },
  };
}

export default Tshirts;
