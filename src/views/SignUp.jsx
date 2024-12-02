import backgroundImageUrl from '../../assets/images/bootcamp/bootcamp-background.jpg'
import {Formik} from "formik";
import customInstance from '../../axios_http_client';
import { useNavigate } from 'react-router-dom'; 

export default function SignUpPage() {
    const navigate = useNavigate(); 
     const registerUser = async (values, setSubmitting) => {
        try {
            const response = await customInstance.post('/api/v1/auth/register', values);
            console.log(response.data);
                alert('Account created successfully!');
                setSubmitting(false);
            navigate('/');
        } catch (error) {
            console.error(error.response);
            alert(error.response?.data?.error || "An error occurred");
            setSubmitting(false);
        }
    };
    return (
        <div className="min-h-screen bg-cover bg-center"
             style={{backgroundImage: `url(${backgroundImageUrl})`}}>
            <div className="flex flex-col justify-center items-center min-h-screen bg-black bg-opacity-50">
                <h1 className="text-4xl text-white font-bold mb-8">Join Our Tech Bootcamp!</h1>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-blue-600 text-center mb-6">Create Your Account</h2>

                    <Formik initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        role: '',
                    }} onSubmit={async(values, {setSubmitting}) => {
                      registerUser(values, setSubmitting);
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
                                <div>
                                    <label className="block text-gray-700 font-semibold">Name</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />

                                    <small className="block text-gray-700 font-semibold">
                                        {errors.name && touched.name && errors.name}
                                    </small>
                                </div>


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

                                {/* Role */}
                                <div>
                                    <label className="block text-gray-700 font-semibold">Role</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="role"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.role}
                                    >
                                        <option value="user">User</option>
                                        <option value="publisher">Publisher</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <small className="block text-gray-700 font-semibold">
                                        {errors.role && touched.role && errors.role}
                                    </small>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button disabled={isSubmitting} role='submit'
                                            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
                                        Submit
                                    </button>
                                </div>

                                {/* Login Button */}
                                <div className="text-center mt-4">
                                    <button className="text-blue-600 hover:text-blue-700">
                                        Already have an account? Login
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
