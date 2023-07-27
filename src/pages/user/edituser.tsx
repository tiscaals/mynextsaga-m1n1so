import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { updateCustomerReq } from '../redux/action/actionReducer'
import { notifySuccess, notifyFailed } from '../alert'

const EditUser = (props:any) =>{
    const dispatch = useDispatch();

    type FormValues = {
        username: string;
        firstname: string;
        lastname: string;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const handleRegistration = async (data:any) => {        
        try {
            const result = dispatch(updateCustomerReq(data, props.data.id));
            notifySuccess(200, "Berhasil Update Data")
            props.closeModal()
        } catch (error) {
            notifyFailed(400, "Gagal Update Data")
        }
    };
    const handleError = (errors:any) => {};

    const registerOptions = {
        username: { required: "Username is required" },
        firstname: { required: "First name is required" },
        lastname: { required: "Last name is required" }
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
                                Edit User
                            </Dialog.Title>
                            <div className="mt-2">
                                <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                                    <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Username</label>
                                            <input type="text" {...register('username', registerOptions.username) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={props.data.username}/>
                                            <small className="text-red-500">
                                            {errors?.username && errors.username.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>First Name</label>
                                            <input type="text" {...register('firstname', registerOptions.firstname) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={props.data.customer.first_name}/>
                                            <small className="text-red-500">
                                            {errors?.firstname && errors.firstname.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Last Name</label>
                                            <input type="text" {...register('lastname', registerOptions.lastname) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={props.data.customer.last_name}/>
                                            <small className="text-red-500">
                                            {errors?.lastname && errors.lastname.message}
                                            </small>
                                        </div>
                                        <div className='grid-cols-2'>
                                            <button className=' col-span-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' onClick={props.closeModal}>Cancel</button>

                                            <button className='ml-1 col-span-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'>Submit</button>
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

export default EditUser
