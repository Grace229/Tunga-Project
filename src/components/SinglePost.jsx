// import React from 'react'
import { useSelector } from 'react-redux';
import moment from "moment"
const SinglePost = () => {
  const post = useSelector((state) => state.post.post); 

  return (
    <>
    <article className="font-sans relative py-24 md:py-28 bg-white overflow-hidden">

<header className="relative px-4 sm:px-6 lg:px-8 mb-6">
  <div className="text-lg max-w-prose mx-auto mb-4">
    <h1
      className="mt-2 mb-2 text-3xl text-center-DIS leading-8 font-extrabold tracking-tight-DIS text-gray-800 sm:text-4xl sm:leading-10"
      itemProp="name headline">
      {post.title} </h1>
  </div>
  <p className="max-w-prose mx-auto mb-2 text-lg uppercase text-gray-500"><span className="font-bold tracking-wide">
    <time className="dt-published text-xs" dateTime="{{ post.created_at }}" itemProp="datePublished">
    {moment(post.created_at).format("MMM Do YYYY")}
    </time>
  </span></p>
</header>
<div className="prose prose-lg xs:px-6 sm:px-4 md:px-0 lg:px-0 xl:px-0 text-gray-700 mx-auto" itemProp="articleBody">
   {post.content} 
</div>
<a className="u-url" href="{{ page.url | relative_url }}" hidden></a>
</article>
    </>
  )
}
export default SinglePost