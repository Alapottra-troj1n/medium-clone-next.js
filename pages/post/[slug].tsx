import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";
import PortableText from "react-portable-text"


interface Props {
    post: Post;
}

const PostPage = ({post}:Props) => {

console.log(post);
  return (
    <div>
      <Header />
      

      <img className='w-full h-40 object-cover' src={urlFor(post.mainImage).url()} alt="" />

      <article className='max-w-3xl mx-auto p-5' >
        <h2 className='text-3xl mt-10 mb-3 font-bold' >{post.title}</h2>

        <div className='flex items-center gap-3'>
          <img className='h-10 w-10 rounded-full' src={urlFor(post.author.image).url()} alt="" />
          <p>Posted by <span className='text-green-400' >{post.author.name}</span> at {new Date(post._createdAt).toLocaleDateString()} </p>
          
        </div>
     


      <div className='py-2'>
        <PortableText 
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
        content={post.body}
        serializers={{
          
          h1: (props: any) => {
            <h1 className='text-2xl font-bold my-5' {...props} />

          },
          h2: (props: any) => {
            <h2 className='text-xl font-bold my-5' {...props} />
            
          },
          li: (props: any) => {
            <li className='ml-4 list-disc' {...props} />
            
          },
          link: (props: any) => {
            <a className='text-blue-500 cursor-pointer hover:underline' {...props} />
            
          }
        
        

        }
            
        }
        />
      </div>
      </article>


      <hr className="max-w-lg mx-auto border border-yellow-300"  />

      <form className="flex flex-col p-5 max-w-2xl mx-auto mb-10" >
        <h2 className="text-2xl font-bold my-5 " >Leave a Comment Below</h2>


          <label className=" block mb-5"> 
            <span className='mr-5' >Name</span>
            <input className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500  outline-none focus:ring' type="text" placeholder="Alapottra Chakma"  name="" id="" />      
          </label   >
          <label  className=" block mb-5" > 
            <span className='mr-5' >Email</span>
            <input  className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500  outline-none focus:ring' type="email" placeholder="alapottrachakma@gmail.com"  name="" id="" />      
          </label>
          <label  className=" block mb-5" > 
            <span className='mr-5' >Comment</span>
            <textarea className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring '  rows={6} placeholder="Comment"  name="" id="" />      
          </label>


      </form>

    </div>
  );
};




export default PostPage;

export const getStaticPaths = async () => {

        const query = `*[_type == 'post']{
            _id,
            slug{
                current
            }
        }`;

      const posts = await sanityClient.fetch(query);
      const paths = posts.map((post : Post) =>({
        params: {
            slug : post.slug.current
        }
      }) )


  return {
        paths,
        fallback: 'blocking'
  };
};


export const getStaticProps : GetStaticProps = async({params})=> {

    const query = `*[_type == 'post' && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
        name,
        image
      },
      body,
      mainImage,
      slug
        
        
      } 
    `
      const post = await sanityClient.fetch(query, {

        slug: params?.slug

      })

      if(!post){
        return {
            notFound: true
        }
      }

    return {
      props: { post }, 
      revalidate: 60,// will be passed to the page component as props
    }
  }
