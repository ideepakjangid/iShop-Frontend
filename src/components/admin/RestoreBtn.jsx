"use client";
import { axiosInstance } from '@/app/library/helper';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FaTrashRestoreAlt } from 'react-icons/fa';

const RestoreBtn = ({url}) => {
    const router = useRouter();

    const restoreHandler = () => {
        axiosInstance.put(url)
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
            <FaTrashRestoreAlt onClick={restoreHandler} className="cursor-pointer" title="Restore" />
        </>
    );
}

export default RestoreBtn;
