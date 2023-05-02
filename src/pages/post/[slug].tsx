import {Post, FormValues, CurrentPost} from '@/../../typings'
import Header from '@/../../components/Header'
import {notFound} from 'next/navigation'
import {GetStaticPaths, GetStaticProps} from 'next'
import {GroQL, urlFor} from '../../../sanity'
import {Resolver, useForm, SubmitHandler} from 'react-hook-form'
import {PortableTextComponents} from '@portabletext/react'
import Image from 'next/image'
import {PortableText} from '@portabletext/react'
import {JSXElementConstructor, Key, ReactElement, ReactFragment, ReactNode, ReactPortal, useState} from 'react'
import comment from '../../../medium-backend/schemas/comment'


function PostedContent({post}: CurrentPost) {

  // console.log(post)

  const [submitted, setSumbitted] = useState<any>(false)


  // @ts-ignore
  const components: PortableTextComponents = {
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      em: ({children}) => <em className='text-gray-600 font-medium '>{children}</em>,
      strong: ({children}) => <strong className={'text-gray-600'}> {children} </strong>,
      link: ({children, value}) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} className={'text-blue-500 hover:underline text-blue-500 transition ease-in-out'}
             style={{fontSize: 15}} rel={rel}>
            {children}
          </a>
        )
      }

      // Ex. 2: rendering a custom `link` annotation
    },
    types: {
      image: ({value}) => {
        value = value.asset
        return (
          <img src={urlFor(value).url()} alt={post.description} />
        )
      }
    },
    block: {
      h1: ({children}) => <h1 className={'font-bold my-4'} style={{fontSize: 36}}>{children}</h1>,
      h2: ({children}) => <h2 className={'font-bold my-4'} style={{fontSize: 32}}>{children}</h2>,
      h3: ({children}) => <h3 className={'font-bold my-4'} style={{fontSize: 28}}>{children}</h3>,
      h4: ({children}) => <h4 className={'font-bold my-4'} style={{fontSize: 24}}>{children}</h4>,
      normal: ({children}) => <p className={'font-normal my-4'} style={{fontSize: 16}}>{children}</p>
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({children}) => <ul className='list-disc  ml-10'>{children}</ul>
    },
    listItem: {
      bullet: ({children}) => <li className={'font-normal my-2'} style={{fontSize: 14}}>{children}</li>,
      number: ({children}) => <ol className={'font-normal my-2'} style={{fontSize: 14}}>{children}</ol>
    }

  }

  const {
    register, handleSubmit, formState: {errors}
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(() => {
      // console.log(data)
      setSumbitted({current: true})
    }).catch((err) => {
      // console.log(`err`)
      setSumbitted({current: false})

    })
  }

  // @ts-ignore
  return (
    <>
      <Header />
      <Image className={'w-full object-cover h-40'} src={urlFor(post.mainImage).url()} alt={'Main image'}
             width={'1000'}
             height={'600'} />

      <article className={'max-w-3xl mx-auto p-5'}>
        <h1 className={'text-3xl mt-30 mb-3'}>
          {post.title}
        </h1>
        <h2 className={'text-xl font-light text-gray-500 mb-2'}>
          {post.description}
        </h2>
        <div className={'flex items-center space-x-2'}>
          <Image src={urlFor(post.author.image).url()} alt={'Author image'} width={'512'} height={'512'}
                 className={'h-10 w-10 rounded-full'} />
          <p className={'font-extralight text-sm'}>
            Blog post by&nbsp; <span className={'text-green-600'}>
            {post.author.name}
          </span> - Published at&nbsp;{new Date(post._createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className={'p-2 mt-4'}>
          <PortableText value={post.body} components={components} onMissingComponent={false} />
        </div>
      </article>

      <hr className={'max-w-lg my-5 mx-auto border border-yellow-500'} />

      {submitted.current ? (
        <div className={'flex flex-col mx-auto p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto'}>
          <h1 className={'text-3xl font-bold'}>Successfully submitted </h1>
          <p style={{fontSize: 16}} className={'font-light'}>Once your comment is approved, it will appear below</p>
        </div>

      ) : (
        <div className={'pb-28 mt-4'}>
          <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col my-5 max-w-2xl mx-auto mb-10'}>
            <h3 className={'text-sm text-yellow-500'}>Enjoy this article</h3>
            <h4 className={'text-3xl font-bold'}>Leave a comment below</h4>
            <hr className={'py-3 mt-2'} />

            <label htmlFor='id' className={'hidden'}>
            <span>
              _id
            </span>
              <input type='hidden' value={post._id} {...register('_id')} />
            </label>

            <label htmlFor='Name' className={'mb-5 block'}>
          <span className={'text-gray-700'}>
            Name
          </span>
              <input type='text' placeholder={'Your name'}  {...register('name', {required: true})}
                     className={'shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring '} />
              {errors.name && (
                <span className={'font-bold text-xs text-red-500 p-2'}>Your name field is required</span>)}
            </label>
            <label htmlFor='Email' className={'mb-5 block'}>
          <span className={'text-gray-700'}>
            Email
          </span>
              <input type='email' placeholder={'Your Email'}  {...register('email', {required: true})}
                     className={'shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring '} />
              {errors.email && (
                <span className={'font-bold text-xs text-red-500 p-2'}>Your email field is required</span>)}

            </label>
            <label htmlFor='Comment' className={'mb-5 block'}>
          <span className={'text-gray-700'}>
            Comment
          </span>
              <textarea placeholder={'Comment'}  {...register(`comment`, {required: true})} rows={6}
                        className={'shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring'} />
              {errors.comment && (
                <span className={'font-bold text-xs text-red-500 p-2'}>Your comment field is required</span>)}

            </label>


            <label htmlFor=''>
            <span>
              <input type='submit'
                     className={' transition ease-in-out shadow bg-yellow-500 hover:bg-yellow-400 hover:-translate-y-1 hover:scale-105 delay-150 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-1 block w-full cursor-pointer'} />
            </span>
            </label>

          </form>
          {/*  Comments */}
          <div className={'flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-300 shadow space-y-2'}>
            <h3 className={'text-4xl'}>
              Comments
            </h3>

            <hr className={'pb-2'} />

            {post.comments.map((comment: {_id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; comment: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined}) => (
                <div key={comment._id}>
                  <p className={'font-normal py-2'}>
                    <span className={'text-yellow-500 font-bold'}> {comment.name}: </span>&nbsp;{comment.comment}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}


    </>
  )
}

export default PostedContent

export const getStaticPaths: GetStaticPaths = async () => {
  const query = ` *[_type == 'post'] {
  _id,
    slug {
      current
    }
  }`
  const posts = await GroQL.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current
    }
  }))
  // We'll pre-render only these paths at build time.
  //{fallback: false } means other routes should 404.
  //{fallback: true} means dynamism is at core
  return {paths, fallback: true}

}

export const getStaticProps: GetStaticProps = async (
  {params}
) => {

  const query = `
  *[_type == 'post' && slug.current == $slug] [0] {
  _id, _createdAt, title, mainImage, body, author -> {name,image}, slug, description,
  'comments': *[ _type == 'comment' && post._ref == ^._id && approved == true], author -> {
        name,image},
}`

  const post = await GroQL.fetch(query, {
    slug: params?.slug
  })
  if (!post) {
    return (notFound())
  }
  return {
    props: {
      post
    },
    revalidate: 25 //re-cache the page ISR
  }


}




