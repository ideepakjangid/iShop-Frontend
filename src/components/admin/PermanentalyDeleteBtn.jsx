"use client";
import { axiosInstance } from '@/app/library/helper';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const PermanentalyDeleteBtn = ({url}) => {
    const router = useRouter();

    const permanentalyDeleteBtnHandler = () => {
        axiosInstance.delete(url)
        .then(
            (response)=>{
                if(response.data.flag === 1){
                    toast.success(response.data.message);
                    router.refresh();
                }
            }
        ).catch(
            (error)=>{
                toast.error(error.message);
            }
        );

    };
    return (
        <>
            <FaTrash onClick={permanentalyDeleteBtnHandler} className="cursor-pointer" title="Delete" />
        </>
    );
}

export default PermanentalyDeleteBtn;
