'use client'

import React from 'react'

export default function Page({ params}) {
    const {slug } = params
    console.log("🚀 ~ page ~ params:", slug)
    return (
        <div>
            {slug}
        </div>
    )
}
