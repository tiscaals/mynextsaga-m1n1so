import React, { useEffect, useState, Fragment } from 'react'
import Content from '../contentlink'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductReq } from '../redux/action/actionReducer'
import { BsThreeDotsVertical, BsPencilFill, BsTrashFill } from 'react-icons/bs'
import { Menu, Transition }from '@headlessui/react'
import DeleteProduct from './deleteproduct'

const Product = () => {
    const { products, message, refresh } = useSelector((state:any) => state.ProductReducers);
    const dispatch = useDispatch();
    
    const [isDelete,setIsDelete]=useState(false)
    const [dataproduct,setDataProduct]=useState('')

    useEffect(()=>{
        dispatch(getAllProductReq())
        console.log(products);
    },[refresh])

    function formatCurrency(amount:any) {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
    }

    return (
        <div>
            <Content title='PRODUCT' isilink='product/addProduct' alias='product/create'>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
                    {(Array.isArray(products) ? products : []).map((dt)=>
                    <a key={dt.id} className='group bg-white p-4 rounded-md'>
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                            <img src={dt.imagePath} 
                            className="h-full w-full object-cover object-center group-hover:opacity-75"/>
                        </div>
                        <div id='hidden' className='flex justify-between'> 
                            <div className='inline-block text-left'>
                                <h3 className="mt-4 text-sm text-gray-700 text-left">{dt.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900 text-left">{formatCurrency(dt.price)}</p>
                            </div>
                            <Menu as="div" className="relative inline-block text-right">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-2 py-4 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                        <BsThreeDotsVertical className='ml-2 -mr-1 text-gray-700 hover:text-gray-400 sm:flex' aria-hidden='true'/>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                    >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <Link href={`product/${dt.id}`}
                                                // onClick={, ()=>{navigate(`${dt.id}`, {state:{productDatas: dt}});}}
                                                className={`${
                                                active ? 'bg-red-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                {active ? (
                                                <BsPencilFill
                                                    className="mr-2 h-5 w-5 text-red-400"
                                                    aria-hidden="true"
                                                />
                                                ) : (
                                                <BsPencilFill
                                                    className="mr-2 h-5 w-5 text-red-400"
                                                    aria-hidden="true"
                                                />
                                                )}
                                                Edit Product
                                            </Link>
                                            )}
                                        </Menu.Item>
                                        </div>
                                        <div className="px-1 py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                            <button
                                                onClick={()=>{setIsDelete(true); setDataProduct(dt)}}
                                                className={`${
                                                active ? 'bg-red-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                                {active ? (
                                                <BsTrashFill
                                                    className="mr-2 h-5 w-5 text-red-400"
                                                    aria-hidden="true"
                                                />
                                                ) : (
                                                <BsTrashFill
                                                    className="mr-2 h-5 w-5 text-red-400"
                                                    aria-hidden="true"
                                                />
                                                )}
                                                Delete
                                            </button>
                                            )}
                                        </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </a>
                    )}
                </div>
            </Content>
            {isDelete?<DeleteProduct show={isDelete} closeModal={()=>setIsDelete(false)} data={dataproduct}/>:''}
        </div>
    )
}

export default Product
