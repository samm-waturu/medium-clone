
import Head from 'next/head'
import Header from '@/../../components/Header'
import Banner from '@/../../components/Banner'
import Posts from '../../components/Posts'
import {Post} from '../../typings'
import {GroQL, urlFor} from '../../sanity'

interface Props {
  posts: [Post] //post=[];
}

export default function Home({posts}: Props) {

  return (
    <div className={'max-w-6xl mx-auto'}>

      <Head>
        <title>
          Medium clone
        </title>
      </Head>

      <Header />
      {/*Nav bar import*/}

      <Banner />
      {/*Banner import*/}

      {/*Passing data to posts*/}

      <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 '}>

      {/*  We are passing the posts components */}
      {posts.map((post) => (
        <Posts id={post._id} key={post._id} link={post.slug.current} desc={post.description} title={post.title}
               imgUrl={post.mainImage} body={post.body} created={post._createdAt} author={post.author} />
      ))}
      </div>

      {/*Posts import */}

    </div>
  )
}

export const getServerSideProps = async () => {

  //GroQL query language
  const query = `*[_type == 'post'] {
    _id,
      title,
      author -> {
        name,image
      },
      slug,
      mainImage,
      description }`

    const posts = await GroQL.fetch(query);

  return {
    props: {
      posts
    }
  }

}