import Head from 'next/head'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>CodesWear- Wear The Code</title>
        <meta name="description" content="CodesWear- Wear The Code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image src="/coding.webp" alt='code' width={1920} height={480}/>
        <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Wear the Code with codeswear.com</h1>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Shop Premium tshirts, hoodies and apparals with codeswear.com</p>
      <div className="flex mt-6 justify-center">
        <div className="w-16 h-1 rounded-full bg-pink-500 inline-flex"></div>
      </div>
    </div>
  </div>
</section>
      </main>
    </>
  )
}
