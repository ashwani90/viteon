import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email('Please Provide email address').required('Please Provide email address'),
    password: yup.string().required('Please provide your password'),
});

function SignIn() {

    const { register, handleSubmit, formState: {errors}, setError,} = useForm({resolver: yupResolver(schema)});
    const onSubmit = async (form) => {
        await Http.post();
        if ((await Http.status()) === 422) {
            let res = await Http.response();
            for (let [field, messages] of Object.entries(res.errors)) {
                setError(field, { type: 'manual', message: message.join(' ') });
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email')}/>
                    {errors.email?.message && <span>{errors.email.message}</span>}
                </div>
                <div>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id="password" {...register('password')}/>
                    {errors.password?.message && <span>{errors.password.message}</span>}
                </div>
                <div>
                    <button>SignIn</button>
                </div>
            </form>
        </div>
    )
}


export default SignIn;
