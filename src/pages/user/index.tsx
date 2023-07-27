import React, { useEffect, useState, Fragment } from 'react'
import Content from '../contentmodal'
import { BsThreeDotsVertical, BsPencilFill, BsTrashFill, BsLockFill, BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { Menu, Transition }from '@headlessui/react'
import AddUser from './adduser'
import EditUser from './edituser'
import DeleteUser from './deleteuser'
import EditPassword from './editpassword'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { getAllUserReq } from '../redux/action/actionReducer'
import { notifySuccess, notifyFailed } from '../alert'
import { useRouter } from 'next/router'

const User = () => {
    const { users, message, status, refresh } = useSelector((state:any) => state.UserReducers,
        );
    const dispatch = useDispatch();
    const [isOpen,setIsOpen]=useState(false)
    const [isEdit,setIsEdit]=useState(false)
    const [isDelete,setIsDelete]=useState(false)
    const [isEditPwd,setIsEditPwd]=useState(false)
    const [datauser,setDataUser]=useState('')
    const router = useRouter()

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const columns = [
        {name:'#No'},
        {name:'Username'},
        {name:'Firstname'},
        {name:'Lastname'}
    ]

    useEffect(()=>{
        dispatch(getAllUserReq())
        console.log('users',users);
        setTimeout(()=>{
            if (status === 200) {
                notifySuccess("Sukses!", message);
            } else if (status === 400) {
              notifyFailed(status,message);
            }
        },30)
        // if(currentPage*10 >= users?.length){
        //     setCurrentPage(currentPage-1)
        // }
    },[setCurrentPage, itemsPerPage, refresh, isOpen, isEdit, isDelete, isEditPwd])

    const totalPages = Math.ceil(users?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = users?.slice(startIndex, endIndex);
    
    return (
        <div>
            <Content title='USER'  fungsi={()=>setIsOpen(true)}>
                <table className='min-w-full table-fixed'>
                    <thead>
                        <tr className='border-t border-gray-200'>
                            {(columns || []).map((col) =>
                            <th className='pr-6 py-2 text-left border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                <span className='lg:pl-2'>{col.name}</span>
                            </th>
                            )}
                            <th className='pr-6 py-2 text-left border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider'></th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-100'>
                        {(currentItems || []).map((dt:any, index:any)=>
                        <tr key={dt.id}>
                            <td className='px-6 py-3 text-sm text-gray-900 text-left'>{startIndex+index+1}</td>
                            <td className='px-6 py-3 text-sm text-gray-900 text-left'>{dt.username}</td>
                            <td className='px-6 py-3 text-sm text-gray-900 text-left'>{dt.customer.first_name}</td>
                            <td className='px-6 py-3 text-sm text-gray-900 text-left'>{dt.customer.last_name}</td>
                            <td className='px-6 py-3 text-sm text-gray-900'>
                                <div className="w-full text-right">
                                    <Menu as="div" className="z-40 relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
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
                                                    <button
                                                        onClick={()=>{setIsEdit(true); setDataUser(dt)}}
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
                                                        Edit Account
                                                    </button>
                                                    )}
                                                </Menu.Item>
                                                </div>
                                                <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                    <button
                                                        onClick={()=>{setIsDelete(true); setDataUser(dt)}}
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
                                                <div className="px-1 py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                    <button
                                                        onClick={()=>{setIsEditPwd(true); setDataUser(dt)}}
                                                        className={`${
                                                        active ? 'bg-red-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        {active ? (
                                                        <BsLockFill
                                                            className="mr-2 h-5 w-5 text-red-400"
                                                            aria-hidden="true"
                                                        />
                                                        ) : (
                                                        <BsLockFill
                                                            className="mr-2 h-5 w-5 text-red-400"
                                                            aria-hidden="true"
                                                        />
                                                        )}
                                                        Edit Password
                                                    </button>
                                                    )}
                                                </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </td>                            
                        </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex+1}</span> to <span className="font-medium">{endIndex}</span> of{' '}
                            <span className="font-medium">{users?.length}</span> results
                        </p>
                        </div>
                        <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                            onClick={() => setCurrentPage(((currentPage-1)<=1)? 1 : currentPage-1)}
                                
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            <BsArrowLeft className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <a onClick={()=>{setCurrentPage(index+1)}} key={index} className={`relative z-10 inline-flex items-center ${
                                    currentPage === (index+1)
                                      ? "bg-red-500 text-white focus-visible:outline-red-600"
                                      : "bg-white text-black"
                                  } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 border border-solid border-gray-300`}>
                                    {index + 1}
                                </a>
                            ))}
                            <a onClick={() => setCurrentPage(((currentPage+1)>=totalPages)? totalPages : currentPage+1)}
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            <BsArrowRight className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                        </div>
                    </div>
                </div>
            </Content>
            <ToastContainer />
            {isOpen?<AddUser show={isOpen} closeModal={()=>setIsOpen(false)}/>:''}
            {isEdit?<EditUser show={isEdit} closeModal={()=>setIsEdit(false)} data={datauser}/>:''}
            {isDelete?<DeleteUser show={isDelete} closeModal={()=>setIsDelete(false)} data={datauser}/>:''}
            {isEditPwd?<EditPassword show={isEditPwd} closeModal={()=>setIsEditPwd(false)} data={datauser}/>:''}
        </div>
    )
}

export default User
