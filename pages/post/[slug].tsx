import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import { sanityClient } from "../../sanity";
import { Post } from "../../typing";


interface Props {
    post: Post;
}

const PostPage = ({post}:Props) => {

console.log(post);
  return (
    <div>
      <Header />
      <h2>{post.title}</h2>
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
      props: { post }, // will be passed to the page component as props
    }
  }
