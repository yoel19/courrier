import React from 'react'
import ArchiveSideBar from '../../components/ArchiveSideBar'
import { Outlet } from "react-router-dom"

export default function Archive() {
    return (
        <div className='root'>
            <ArchiveSideBar />
            <div className='details'>
                <Outlet><div>Contenu du courrier</div></Outlet>
            </div>
        </div>
    )
}
