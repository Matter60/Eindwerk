"use client"
import GlobalApi from '@/services/GlobalApi'
import React, { useEffect } from 'react'

function GenreList() {

    useEffect(() => {
        getGenreList()

    }, [])

    const getGenreList =() => {
        GlobalApi.getGenreList.then((resp)=>{
            console.log(resp)
        })

    }
  return (
    <div>GenreList</div>
  )
}

export default GenreList