// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faKey, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

interface Values {
    email: string;
    password: string;
}

export default function Login() {
    return (
        <div className="rounded-xl mx-9 my-5 p-5 bg-white shadow-2xl">
            <div className="relative my-10 w-1/4 mx-auto">
                {/* <form action="post" className="flex flex-col space-y-6">
                    <p className="text-2xl text-center font-semibold">Zheke kabinet</p>

                    <div className="relative">
                        <input type="text" placeholder="Username" name="username" className="border border-gray-400 rounded-lg px-3 py-2 pl-10 w-full" />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    <div className="relative">
                        <input type="password" placeholder="Password" name="password" className="border border-gray-400 rounded-lg px-3 py-2 pl-10 w-full" />
                        <FontAwesomeIcon icon={faKey} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>

                    <button type="submit" className="border border-black hover:bg-gray-400 duration-300 py-2 rounded-lg">
                        Kiru
                    </button>
                </form> */}
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Field type="email" name="email" />
                            <ErrorMessage name="email" component="div" />
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" component="div" />
                            <button type="submit" disabled={isSubmitting}>
                                Kiru
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
