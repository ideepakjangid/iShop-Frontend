"use client";
import { axiosInstance } from '@/app/library/helper';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const DeleteBtn = ({url}) => {
    const router = useRouter();

    const moveToTrashHandler = () => {
        axiosInstance.get(url)
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
            <FaTrash onClick={moveToTrashHandler} className="cursor-pointer" title="Move to trash" />
        </>
    );
}

export default DeleteBtn;
