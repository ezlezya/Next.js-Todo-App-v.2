'use client'

import React from 'react'

type PropsType = {
    body: string,
    active: boolean,
    _id?: string,
    activeChange: (id: string, status: boolean) => void
    deleteTodo: (id: string) => void
}

export default function Todos({ body, active, _id, activeChange, deleteTodo }: PropsType) {
    return (
        <div className='flex items-center gap-2'>
            <input type="checkbox" id={_id} className='cursor-pointer peer' defaultChecked={active} onChange={(e) => activeChange(_id!, e.target.checked)} />
            <label htmlFor={_id} className="text-[24px] text-white peer-checked:text-red-600 peer-checked:line-through">{body}</label>
            <span title="delete current todo" className='text-red-600 cursor-pointer ml-2' onClick={() => deleteTodo(_id!)}>X</span>
        </div>
    )
}
