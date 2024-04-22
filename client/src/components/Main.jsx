import { useEffect, useState } from "react"
import Header from "./Header"
import ProductCard from "./ProductCard"
import axios from 'axios'

function Main() {
    const [products, setProducts] = useState([])

    useEffect(() => {  
        const getProducts = async() => {
            try {
                const response = await axios.get('http://localhost:3000/api/product/')
                setProducts(response.data.products)
            } catch (e) {
                console.log(e);
            }
        }
        getProducts()
    }, [])

    return (
        <div className="display">
           <Header/>
           <div className="products_display">
                {products.map(product => {
                    return (
                        <ProductCard product={product} key={product.id}/>
                    )
                })}
           </div>
        </div>
)}

export default Main
