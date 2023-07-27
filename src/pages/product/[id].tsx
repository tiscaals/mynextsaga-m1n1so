import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryReq, getProductByIdReq, updateProductReq } from '../redux/action/actionReducer'
import { notifySuccess, notifyFailed } from '../alert'
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const EditProduct = () =>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    type FormValues = {
        name: string;
        description:string;
        category_id:number;
        price:number;
        images:object;
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const { categories, refresh: categoryRefresh } = useSelector((state:any) => state.CategoryReducers);
    const { products, refresh: productsRefresh } = useSelector((state:any) => state.ProductReducers);

    useEffect(()=>{
        // console.log("ROUTE QUERY", router.query);
        // console.log("PRODUCT", products);
        dispatch(getAllCategoryReq());
        dispatch(getProductByIdReq(id));

    },[categoryRefresh, productsRefresh, id])

    const handleUpdate = async(data:any) => {
        console.log(typeof data.images)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        formData.append('price', data.price);
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }

        console.log(Array.from(formData.entries()));

        try {
            const result = await dispatch(updateProductReq(formData, id))
            notifySuccess(200, "Berhasil Update Product")
        } catch (error) {
            notifyFailed(400, "Gagal Update Product")
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
            <form onSubmit={handleSubmit(handleUpdate, handleError)}>
                <div className='grid grid-cols-1 gap-4 max-w-xl m-auto'>
                <div className='col-span-1'>
                        <label className='text-gray-900'>Product Name</label>
                        <input type="text" {...register('name', registerOptions.prodname) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={products?.name}/>
                        <small className="text-danger">
                            {errors?.name && errors.name.message}
                        </small>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Description</label>
                        <textarea {...register('description', registerOptions.description) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={products?.description}/>
                        <small className="text-danger">
                            {errors?.description && errors.description.message}
                        </small>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Product Category</label>
                        <select {...register('category_id') }  className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={products?.category_id}>
                            {categories.map((ct:any)=>(
                                <option key={ct.id} value={ct.id}>{ct.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Price</label>
                        <input type="number" {...register('price', registerOptions.price) } className='rounded-md border-solid-gray-400 border-2 p-3 md:text-md w-full text-gray-900' defaultValue={products?.price}/>
                        <small className="text-danger">
                            {errors?.price && errors.price.message}
                        </small>
                    </div>
                    <div className='col-span-1'>
                        <label className='text-gray-900'>Upload Product Images</label>
                        <input type="file" {...register('images', registerOptions.images)} className='rounded-md border-solid-gray-400 border-2 p-3 ml-4 text-gray-900'
                        multiple/>
                        <small className="text-danger"/>
                            {errors?.images && errors.images.message}
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

export default EditProduct
