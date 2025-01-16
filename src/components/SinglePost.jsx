import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Modal from "./Modal";
import {Formik} from "formik";
import moment from "moment"
import { toast } from "react-toastify";
import customInstance from '../axios_http_client';
import { createPostStart, createPostSuccess, createPostFailure } from '../redux/postSlice';

const SinglePost = () => {
  const dispatch = useDispatch();

  const{ post, loading} = useSelector((state) => state.post); 
  const [isModalOpen, setModalOpen] = useState(false);
  const addPost = async (values, setSubmitting) => {
    dispatch(createPostStart())
    try {  
        const response = await customInstance.post('/post', values);
        dispatch(createPostSuccess(response.data));
        console.log(response);
        toast.success(response.data.message);     
            setSubmitting(false);       
    } catch (error) {
        console.error(error.response.data.email[0]);
        dispatch(createPostFailure(error.response.data.email[0] || "An error occurred"))
        toast.error(error.response.data.email[0] || "An error occurred");    
        setSubmitting(false);

    }
};
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
<div className='max-w-[60%] mx-auto flex justify-between mt-6 px-2'>
<button
            onClick={() => setModalOpen(true)}
                className="bg-[#002061] text-white px-4 py-2 rounded-lg hover:bg-[#fff] hover:text-[#ed3273] transition"
              >
                Edit Post
              </button>
              <button
            onClick={() => setModalOpen(true)}
                className="bg-[#ed3273] text-white px-4 py-2 rounded-lg hover:bg-[#fff] hover:text-[#ed3273] transition"
              >
                Delete Post
              </button>
</div>

</article>
{isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Formik initialValues={{
                        title: '',
                        content: '',
                    
                    }} onSubmit={async(values, {setSubmitting}) => {
                      addPost(values, setSubmitting);
                    }} validate={(values) => {
                        const errors = {};
                        const wordCount = values.content.trim().split(/\s+/).length;
                        if (!values.content) {
                          errors.content = "This field is required";
                        } else if (wordCount < 100) {
                          errors.content = `The text must be at least 100 words. Currently, it has ${wordCount} words.`;
                        }
                        if (!values.title){
                            errors.title = 'Title is required';

                        }
                        return errors;
                    }}>
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting
                          }) => (
                            <form className="space-y-4" onSubmit={handleSubmit}>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-semibold">Title</label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your title"
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title}
                                    />

                                    <small className="block text-red-700 font-semibold">
                                        {errors.title && touched.title && errors.title}
                                    </small>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-gray-700 font-semibold">Post</label>
                                    <textarea
                                    rows="4" cols="50"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="What is on your mind"
                                        name="content"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.content}
                                    />

                                    <small className="block text-red-700 font-semibold">
                                        {errors.content && touched.content && errors.content}
                                    </small>
                                </div>
                                <div>
  <button
    disabled={isSubmitting}
    type="submit"
    className="w-full bg-[#002061] text-white p-3 rounded hover:bg-pink-700 transition flex justify-center items-center"
  >
    {loading ? (
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
    ) : (
      "Edit Post"
    )}
  </button>
</div>

                            </form>
                        )}
                    </Formik>
          <div className="flex justify-center content-center">
          </div>
        </Modal>
      )}
    </>
  )
}
export default SinglePost