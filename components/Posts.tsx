import Link from 'next/link'
import {urlFor} from '../sanity'
import Image from 'next/image'
import {PostsOnly} from '../typings'

function Posts({id, link, imgUrl, desc, title, body, created, author}: PostsOnly ) {
  return (
    <>
      <Link href={`/post/${link}`} key={id}>
        {/* Using only render if there is a post image post.mainImage && {pass in Image} */}
        <div className={'border rounded-lg group: cursor-pointer overflow-hidden'}>
          <Image
            className={`h-60 w-full object-cover hover:scale-105'transition-transform duration-200 ease-in-out cursor-pointer`}
            src={`${urlFor(imgUrl).url()!}`} alt={'Main blog image'}
            width={'512'} height={'512'} />
          <div className={'flex justify-between p-5'}>
            <div>
              <p className={'text-lg font-bold '}>
                {title}
              </p>
              <p className={'text-xs'}>
                {desc}
              </p>
              <p className={'text-xs font-bold'}>
                 <span className={'text-xs font-medium'}>
                   by &nbsp;
                 </span>{author.name}
              </p>
            </div>
            <Image className={'h-12 w-12 rounded-full'} src={`${urlFor(author.image).url()!}`} alt={'Author image'}
                   width={'512'} height={'512'} quality={'100'} />
          </div>
        </div>
      </Link>
    </>
  )
}

export default Posts
