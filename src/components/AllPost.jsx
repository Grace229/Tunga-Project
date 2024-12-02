/* eslint-disable react/prop-types */
import moment from "moment"

const AllPost = ({posts}) => {
  return (
    <>
      <div className="container max-w-screen-lg py-24 md:py-28 mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-4xl font-black">Blog</h1>
        {posts && posts.length > 0 ? (
          posts.map((post, index) => (
    <ul className="mt-12" key={index}>
            <li  className="mt-16 list-reset">
              <time
                className="uppercase text-xs text-gray-500 font-bold"
                dateTime={post.date}
              >
                {moment(post.created_at).format("MMM Do YY")}
              </time>
              <h2 className="mt-1 text-2xl tracking-tight font-extrabold text-gray-900 sm:leading-none md:text-3xl">
                <a href={post.url} className="hover:underline">
                  {post.title}
                </a>
              </h2>
              <div className="mt-6 post-content">{post.content}</div>
              <div className="mt-10">
                <a
                  className="text-blue-500 uppercase text-sm tracking-wide font-black content-link"
                  href={post.url}
                >
                  Read More
                </a>
              </div>
            </li>
              <hr className="w-full bg-gray-100 my-12" />
              </ul>
          ))
        ) : (
          <p className="mt-6 text-gray-600">No posts available.</p>
        )}
      
</div>
    </>
  )
}

export default AllPost