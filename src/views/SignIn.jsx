import {Formik} from "formik";
import customInstance from '../axios_http_client';
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const navigate = useNavigate(); 
     const loginUser = async (values, setSubmitting) => {
        try {
        dispatch(loginStart())
            const response = await customInstance.post('/login', values);
            dispatch(loginSuccess(response.data));
            localStorage.setItem('authToken', response.data.token)
            console.log(response.data);
            toast.success(response.data.message);     
                setSubmitting(false);       
            navigate('/');
        } catch (error) {
            let errorMessage;
if (error.response && error.response.data) {
    if (error.response.data.non_field_errors && error.response.data.non_field_errors.length > 0) {
        errorMessage = error.response.data.non_field_errors[0];
    } else if (error.response.data.email && error.response.data.email.length > 0) {
        errorMessage = error.response.data.email[0];
    } else {
        errorMessage = "An error occurred";
    }
} else {
    errorMessage = "An error occurred"; // Fallback if no error.response or data
}
            console.error(error.response.data.non_field_errors[0]);
            dispatch(loginFailure(errorMessage))
            toast.error(errorMessage);    
            setSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-cover bg-center">
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#002061] ">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-[#)00] text-center mb-6">Login</h2>

                    <Formik initialValues={{
                        email: '',
                        password: ''

                    }} onSubmit={async(values, {setSubmitting}) => {
                      loginUser(values, setSubmitting);
                    }} validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
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
                                {/* {errors} */}


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

                                    <small className="block text-gray-700 font-semibold">
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

                                    <small className="block text-gray-700 font-semibold">
                                        {errors.password && touched.password && errors.password}
                                    </small>
                                </div>

                                {/* Submit Button */}
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

                                {/* Login Button */}
                                <div className="text-center mt-4">
                                    <button className="text-[#000] hover:text-[#002061]">
                                        Don&apos;t have an account?  <Link to="/register" className="text-[#002061] hover:text-blue-700 hover:underline">
            Sign Up
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
