import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL || "https://car-rental-backend-u7i7.onrender.com"

export const AppContext= createContext()


export const AppContextProvider=({children})=>{

    const navigate=useNavigate()
    const currency=import.meta.env.VITE_CURRENCY

    const [token, setToken]=useState(null)
    const [user, setUser]=useState(null)
    const [isOwner, setIsOwner]=useState(false)
    const [showLogin, setShowLogin]=useState(false)
    const [pickupDate, setPickupDate]=useState('')
    const [returnDate, setReturnDate]=useState('')
    const [cars, setCars]=useState([])

    // function to check if user is logged in
    const fetchUser=async ()=>{
        try {
            
            const {data}=await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user)
                setIsOwner(data.user.role==='owner')
            }else{
                navigate('/')
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to fetch all cars from server
    const fetchCars=async()=>{
        try {
            const {data}=await axios.get('/api/user/cars')

            if(data.success){
                setCars(data.cars)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to logout the user
    const logout=()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization']= ''
        
        toast.success("Logged Out Successfully!")
    }

    // useeffect to retrieve the token from local storage
    useEffect(()=>{
        const token=localStorage.getItem('token')
        setToken(token)
        fetchCars()
    })

    // useeffect to fetch user data when token is available
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
        }
    }, [token])

    const value={
        navigate,
        currency,
        axios,
        user, setUser,
        token, setToken,
        cars, setCars,
        isOwner, setIsOwner,
        showLogin, setShowLogin,
        fetchCars, fetchUser,
        logout,
        pickupDate, setPickupDate,
        returnDate, setReturnDate
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

 