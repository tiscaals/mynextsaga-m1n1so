import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { loginReq } from '../pages/redux/action/actionReducer';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image'
import logo from "../images/miniso1.png";
import AddUser from './user/adduser';
import { useRouter } from 'next/router';

const AddProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [isOpen,setIsOpen]=useState(false)

    type FormValues = {
        username: string;
        password:string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const { token: tokenReducer, status, message } = useSelector((state:any) => state.LoginReducers);

    const handleRegistration = async(data:any) => {
        console.log(data);
        const result = await dispatch(loginReq(data))
    };
    const handleError = (errors:any) => {};

    useEffect(()=>{
        const token = localStorage.getItem('AuthToken');
        if (token) {
            console.log('TOKEN',token);
            router.push('/');
        }
    },[handleRegistration])

    const registerOptions = {
        username: { required: "Username is required" },
        password: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        }
    };

    return (
        <div className="lg:flex lg:flex-wrap h-screen bg-white">
            <div className="px-4 md:px-0 lg:w-6/12 flex items-center bg-gradient-to-r from-red-700 to-red-300">
                <div className="flex items-center rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                        <h4 className="mb-6 text-xl font-semibold">
                            MINISO BABAKAN MADANG
                        </h4>
                        <p className="text-sm text-justify">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip ex
                            ea commodo consequat.
                        </p>
                    </div>
                </div>
            </div>
            <div className='px-4 md:px-0 lg:w-6/12 my-auto'>
                <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                        <Image
                            className="mx-auto w-48"
                            src={logo}
                            alt="logo" />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold text-gray-900">
                        MINISO BABAKAN MADANG
                        </h4>
                    </div>

                    <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                        <p className="mb-4 text-gray-900">Please login to your account</p>
                        <div className="relative mb-4" data-te-input-wrapper-init>
                            <label className='text-sm text-gray-500'>
                                    Username
                            </label>
                            <input
                                type="text" {...register('username', registerOptions.username) }
                                className="block min-h-auto w-full rounded border-0 bg-gray-50 text-gray-900 px-3 py-1 leading-6 outline-none transition-all duration-200 ease-linear placeholder-opacity-100 peer dark:placeholder-text-neutral-200 peer-placeholder-opacity-0"
                                autoComplete='off'
                                placeholder="Username" />
                            <small className="text-red-500">
                                {(errors?.username && errors.username.message)}
                            </small>
                        </div>

                        <div className="relative mb-4" data-te-input-wrapper-init>
                            <label className='text-sm text-gray-500'>
                                    Password
                            </label>
                            <input
                                type="password" {...register('password', registerOptions.password) }
                                className="peer block min-h-auto w-full rounded-none bg-gray-50 text-gray-900 px-3 py-1 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-te-input-state-active:placeholder-opacity-100 motion-reduce:transition-none dark:placeholder-text-neutral-200 !placeholder-opacity-0"

                                placeholder="Password" />
                            <small className="text-red-500">
                                {(errors?.password && errors.password.message)}
                                {/* {errors?.password && errors.password.message} */}
                            </small>
                        </div>
                        {status === 400 && (
                        <div className='text-center font-semibold bg-red-100 border border-red-400 px-4 py-1 rounded relative'>
                            <small className="text-red-500" role='alert'>
                                {message}
                            </small>
                        </div>
                        )}

                        <div className="mb-12 pb-1 pt-1 text-center">
                            <button type='submit'
                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg bg-red-500"
                            >
                                Log in
                            </button>

                            <a href="#!" className='text-gray-900'>Forgot password?</a>
                        </div>

                        <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2 text-gray-900">Don't have an account?</p>
                            <button onClick={()=>setIsOpen(true)}
                                type="button"
                                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-80 bg-red-500"
                                data-te-ripple-init
                                data-te-ripple-color="light">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
            {isOpen?<AddUser show={isOpen} closeModal={()=>setIsOpen(false)}/>:''}
        </div>
    )
}

export default AddProduct
