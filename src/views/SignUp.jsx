import {Formik} from "formik";
import customInstance from '../axios_http_client';
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../redux/authSlice';


export default function SignUp() {
    const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

    const navigate = useNavigate(); 
     const registerUser = async (values, setSubmitting) => {
        dispatch(registerStart())
        try {  
            const response = await customInstance.post('/register', values);
            dispatch(registerSuccess(response.data));
            localStorage.setItem('authToken', response.data.token)
            console.log(response.data);
            toast.success(response.data.message);     
                setSubmitting(false);       
            navigate('/');
        } catch (error) {
            console.error(error.response.data.email[0]);
            dispatch(registerFailure(error.response.data.email[0] || "An error occurred"))
            toast.error(error.response.data.email[0] || "An error occurred");    
            setSubmitting(false);

        }
    };
    return (
        <div className="min-h-screen bg-cover bg-center">
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#002061] ">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-[#)00] text-center mb-6">Create Your Account</h2>

                    <Formik initialValues={{
                        email: '',
                        password: '',
                    
                    }} onSubmit={async(values, {setSubmitting}) => {
                      registerUser(values, setSubmitting);
                    }} validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password){
                            errors.password = 'Password is required';

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
                                    <label className="block text-gray-700 font-semibold">Email</label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />

                                    <small className="block text-red-700 font-semibold">
                                        {errors.email && touched.email && errors.email}
                                    </small>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-gray-700 font-semibold">Password</label>
                                    <input
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />

                                    <small className="block text-red-700 font-semibold">
                                        {errors.password && touched.password && errors.password}
                                    </small>
                                </div>

                                {/* Submit Button */}
                                <div>
  <button
    disabled={isSubmitting}
    type="submit"
    className="w-full bg-[#ed3273] text-white p-3 rounded-lg hover:bg-pink-700 transition flex justify-center items-center"
  >
    {loading ? (
      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
    ) : (
      "Submit"
    )}
  </button>
</div>


                                {/* Login Button */}
                                <div className="text-center mt-4">
                                    <button className="text-[#000] hover:text-[#002061]">
                                        Already have an account?  <Link to="/signin" className="text-[#002061] hover:text-blue-700 hover:underline">
            Login
          </Link>
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    )
}
