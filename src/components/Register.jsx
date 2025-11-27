import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required").min(2, "Too short"),
  lastName: Yup.string().required("Last name is required").min(2, "Too short"),
  username: Yup.string().required("Username is required").min(3, "Too short"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 chars")
    .required("Password is required"),
});

export default function Register() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop"
          alt="shopping"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-light tracking-wide">Elevate Style.</h1>
          <p className="text-gray-200 mt-2 tracking-wider text-sm">
            Join the premium community.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-8 py-16 bg-[#fafafa]">
        <div className="w-full max-w-md p-10 rounded-3xl bg-white shadow-xl border border-gray-100">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2 tracking-wide">
            Create Your Account
          </h2>

          <p className="text-gray-500 mb-8 text-sm tracking-wide">
            Become a member and enjoy exclusive clothing drops.
          </p>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                setIsLoading(true);

                const result = await register(values);

                if (result.success) {
                  setFormMsg("Registration successful! Redirecting...");
                  navigate("/login")
                //   setTimeout(() => {
                //     onToggle();
                //   }, 1500);
                } else {
                  setFormMsg(result.message || "Registration failed");
                }
              } catch (error) {
                console.error(error);
                setFormMsg("Something went wrong");
              } finally {
                setIsLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">

                {/* FIRST + LAST NAME */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      First Name
                    </label>
                    <Field
                      type="text"
                      name="firstName"
                      className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 
                      focus:ring-2 focus:ring-black/80 outline-none"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600 font-medium">
                      Last Name
                    </label>
                    <Field
                      type="text"
                      name="lastName"
                      className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 
                      focus:ring-2 focus:ring-black/80 outline-none"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                {/* USERNAME */}
                <div>
                  <label className="text-sm text-gray-600 font-medium">Username</label>
                  <Field
                    type="text"
                    name="username"
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 
                    focus:ring-2 focus:ring-black/80 outline-none"
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="text-sm text-gray-600 font-medium">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 
                    focus:ring-2 focus:ring-black/80 outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="text-sm text-gray-600 font-medium">Password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 
                    focus:ring-2 focus:ring-black/80 outline-none"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* SHOW MESSAGE */}
                {formMsg && (
                  <p className={`text-sm font-medium ${formMsg.includes("successful") ? "text-green-600" : "text-red-500"}`}>
                    {formMsg}
                  </p>
                )}

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-xl font-medium 
                  tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-gray-500 text-center text-sm mt-8">
            Already a member?{" "}
            <span
              className="text-black font-medium cursor-pointer hover:opacity-70 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
