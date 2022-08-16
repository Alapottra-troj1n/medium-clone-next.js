import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import Header from '../components/Header';
import {sanityClient, urlFor} from '../sanity';
import { Post } from '../typing';


interface Props {
  posts : [Post];
}

const Home = ({posts} : Props) => {

  console.log(posts);

  return (
    <div className="">
      <Head>
        <title>NEXT Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Header/>
      
      <div className="  flex py-10  justify-between items-center bg-yellow-400 border-y border-black lg:py-0">

        
            <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-xl font-serif"><span className="underline decoration-black decoration-4">Medium</span>  Clone created with Next.js </h1>
            <h2>It is an open platform where over 100 million readers come to find insightful and dynamic thinking.</h2>

            </div>

            <div className="hidden md:inline-flex h-32 lg:h-full">

                <img src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="" />

            </div>





      </div>


    <div className='max-w-7xl gap-5 mx-auto py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

      {posts.map(post =>  (

          <Link href={`/post/${post.slug.current}`} key={post._id}>
              <div className='cursor-pointer border rounded-xl overflow-hidden'>
                <img src={urlFor(post.mainImage).url()} alt="" />
                <div className='flex justify-between p-5 bg-white'>


                <div>

                <h2 className='text-xl font-bold' >{post.title}</h2>
                  <h2>This is a small description of the by <span className='font-medium' >{post.author.name}</span> </h2>
                </div>

                <img src={urlFor(post.author.image).url()} alt="" className='h-12 w-12 rounded-full' />

                


                </div>
              </div>
          </Link>

      )  )}


    </div>





    
    </div>
  )
}

export default Home;


export async function getServerSideProps() {

  const query = `*[_type == 'post'] {
    _id,
    title,
    author -> {
    name,
    image
  },
  body,
  mainImage,
  slug
  }`

  //connecting to sanity client

  const posts = await sanityClient.fetch(query);


  return {
    props: {
      posts: posts,

    }, 
  }
}