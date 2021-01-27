import API from '../config'
import queryString from 'querystring'

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method :"GET",
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method :"GET",
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

export const getFilteredProducts = (skip,limit,filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    }

    return fetch(`${API}/products/by/search`, {
        method :"POST",
        headers:{
            Accept:'application/json',
            "Content-Type" : 'application/json',
        },
        body:JSON.stringify(data)
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}


export const list = params => {

    const query = queryString.stringify(params)
    console.log('query',query)
    return fetch(`${API}/products/search?${query}`, {
        method :"GET",
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method :"GET",
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

export const relatedProducts = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method :"GET",
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}

export const createOrder = (userId,token,orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderData})
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
}