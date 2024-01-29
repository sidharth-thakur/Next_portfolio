'use client';
import React from 'react'
import styles from './style.module.scss';

export default function index({index, title,src,links, manageModal}) {

    return (
        <div onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
            <img className='xs img' src={`/images/${src}`} />
            <a href={links}><h2>{title}</h2></a>
            <p>Design & Development</p>
        </div>
    )
}
