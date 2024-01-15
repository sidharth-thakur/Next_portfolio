'use client';
import React from 'react'
import styles from './style.module.scss';

export default function index({index, title,src, manageModal}) {

    return (
        <div onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} className={styles.project}>
            <img className='xs img' src={`/images/${src}`} />
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
