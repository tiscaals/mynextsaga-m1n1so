import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addCustomerReq } from '../redux/action/actionReducer';

function AddUser(props:any) {
    type FormValues = {
        username: string;
        password:string;
        firstname:string;
        lastname:string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const dispatch = useDispatch()

    const handleRegistration = async(data:any) => {
        const result = await dispatch(addCustomerReq(data))
        console.log(result)
        //NANTI PINDAHIN ALERTNYA KE USER.TSX
        // notifySuccess(200, "Berhasil Update Data")
        props.closeModal()
        // setPesan(result.statusText)

    };
    const handleError = (errors:any) => {};

    const registerOptions = {
        username: { required: "Username is required" },
        firstname: { required: "First name is required" },
        lastname: { required: "Last name is required" },
        password: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        }
    };

    return (
        <div>
            <Transition appear show={props.show} as={Fragment}>
                <Dialog as="div" className="relative z-10" static onClose={()=>null}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Add User
                            </Dialog.Title>
                            <div className="mt-2">
                                <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                                    <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Username</label>
                                            <input type="text" {...register('username', registerOptions.username) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'/>
                                            <small className="text-danger">
                                                {errors?.username && errors.username.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Password</label>
                                            <input
                                            type="password" 
                                            {...register('password', registerOptions.password)}
                                            className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'
                                            />
                                            <small className="text-danger">
                                                {errors?.password && errors.password.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>First Name</label>
                                            <input type="text" {...register('firstname', registerOptions.firstname) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'/>
                                            <small className="text-danger">
                                                {errors?.firstname && errors.firstname.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Last Name</label>
                                            <input type="text" {...register('lastname', registerOptions.lastname) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'/>
                                            <small className="text-danger">
                                                {errors?.lastname && errors.lastname.message}
                                            </small>
                                        </div>
                                        <div className='flex justify-between'>
                                            <button className='col-span-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2' onClick={props.closeModal}>Cancel</button>

                                            <button className='ml-1 col-span-2 inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default AddUser
