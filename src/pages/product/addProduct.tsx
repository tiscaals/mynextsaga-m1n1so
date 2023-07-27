import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { addProductReq, getAllCategoryReq } from '../redux/action/actionReducer';
import { notifySuccess, notifyFailed } from '../alert'
// import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdPhoto } from 'react-icons/md';

const AddProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    type FormValues = {
        name: string;
        description:string;
        category_id:number;
        price:number;
        images:object;
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const { categories, message, refresh } = useSelector((state:any) => state.CategoryReducers);
    // const [selectedCate, setSelectedCate] = useState(categories[0].name)
    
    useEffect(()=>{
        dispatch(getAllCategoryReq())
        console.log(categories);
        // setSelected(categories[0].name)
    },[refresh])

    const handleCreate = async(data:any) => {
        // console.log(typeof data.images)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        formData.append('price', data.price);
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }

        // console.log(Array.from(formData.entries()));

        try {
            // console.log(data);
            // console.log(data.images);
            const result = await dispatch(addProductReq(formData))
            notifySuccess(200, "Berhasil Add Product")
            router.push('/product')
        } catch (error) {
            notifyFailed(400, "Gagal Add Product")
        }
    };
    const handleError = (errors:any) => {};

    const registerOptions = {
        prodname: { required: "Product name is required" },
        description: { required: "Description is required" },
        price: { required: "Price is required" },
        images: { 
            required: "Select least 1 image", 
            validate: {
                maxFiles: (files:any) => files.length <= 5 || "Maximum 5 images allowed"
              }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreate, handleError)}>
                <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Product Name</label>
                        <input type="text" {...register('name', registerOptions.prodname) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'/>
                        <small className="text-danger">
                            {errors?.name && errors.name.message}
                        </small>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Description</label>
                        <textarea {...register('description', registerOptions.description) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'/>
                        <small className="text-danger">
                            {errors?.description && errors.description.message}
                        </small>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Product Category</label>
                        <select {...register('category_id') }  className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'>
                            {categories.map((ct:any)=>(
                                <option key={ct.id} value={ct.id}>{ct.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Price</label>
                        <input type="number" {...register('price', registerOptions.price) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'/>
                        <small className="text-danger">
                            {errors?.price && errors.price.message}
                        </small>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Upload Product Images</label>
                        
                        <div className="w-full mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <MdPhoto className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                <span>Upload a file</span>
                                <input type="file" {...register('images', registerOptions.images)} className="sr-only" multiple/>
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        {/* <small className="text-danger">
                            {errors?.images && errors.images.message}
                        </small> */}



                        {/* <input type="file" {...register('images', registerOptions.images)} className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900'
                        multiple/>
                        <small className="text-danger">
                            {errors?.images && errors.images.message}
                        </small> */}
                    </div>
                    <div className='flex justify-between'>
                        <Link href={'/product'}>
                            <button className='col-span-2 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'>Cancel</button>
                        </Link>

                        <button className='ml-1 col-span-2 inline-flex justify-center rounded-md border border-transparent bg-red-700 px-4 py-2 text-sm font-medium text-red-100 hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'>Submit</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddProduct
