import React from "react";
import { useLocation } from "react-router";

export const Module = () => {
    const fetchData = useLocation()   
    console.log(fetchData);
    const {topic, college} = fetchData.state;
    

    return (
        <>
         
        </>
    )
}