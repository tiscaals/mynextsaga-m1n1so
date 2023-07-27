import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordReq } from '../redux/action/actionReducer';
import { notifySuccess, notifyFailed } from '../alert'

function EditPassword(props:any) {
    const { users, message, status, refresh } = useSelector((state:any) => state.UserReducers,
        );
    const dispatch = useDispatch();

    type FormValues = {
        password_lama: string;
        password_baru: string;
        confirmPassword: string;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const handleRegistration = async(data:any) => {
        try {
            const result = dispatch(updatePasswordReq(data, props.data.id));
            // if (status===200) {
            //     notifySuccess(200, "Berhasil Update Password")
                props.closeModal()
            // }else{
            //     notifyFailed(status, message)
            // }
        } catch (error:any) {
            // notifyFailed(400, error.message)
        }
    };
    const handleError = (errors:any) => {};

    const registerOptions = {
        password: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        },
        confirmPassword: {
            validate: (value:any, values:any) => value === values.password_baru || "Passwords do not match"
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
                                Edit Password
                            </Dialog.Title>
                            <div className="mt-2">
                                <form onSubmit={handleSubmit(handleRegistration, handleError)}>
                                    <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Password Lama</label>
                                            <input
                                            type="password"
                                            {...register('password_lama', registerOptions.password)}
                                            className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'
                                            />
                                            <small className="text-red-500">
                                            {errors?.password_lama && errors.password_lama.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Password Baru</label>
                                            <input
                                            type="password"
                                            {...register('password_baru', registerOptions.password)}
                                            className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'
                                            />
                                            <small className="text-red-500">
                                            {errors?.password_baru && errors.password_baru.message}
                                            </small>
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-gray-900'>Confirm Password</label>
                                            <input
                                            type="password"
                                            {...register('confirmPassword', registerOptions.confirmPassword)}
                                            className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'
                                            />
                                            <small className="text-red-500">
                                            {errors.confirmPassword && errors.confirmPassword.message}
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

export default EditPassword
