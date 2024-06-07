import React from 'react';

const InfoCardxs = props => {
    return (
        <div className='w-64 h-28 bg-stockifyPurple text-white p-4 rounded-3xl justify-center flex flex-col items-center gap-1'>
            <div>{props.title}</div>
            <div className='text-3xl font-bold'>{props.content}</div>
        </div>
    );
}

export default InfoCardxs;
