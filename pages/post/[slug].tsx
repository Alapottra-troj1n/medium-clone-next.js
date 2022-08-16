import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typing";


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
          <p>Posted by {post.author.name} at {new Date(post._createdAt).toLocaleDateString()} </p>
          
        </div>
      </article>

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
