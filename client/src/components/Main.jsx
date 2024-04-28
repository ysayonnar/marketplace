import { useEffect, useState } from "react"
import Header from "./Header"
import ProductCard from "./ProductCard"
import MyButton from "../UI/MyButton/MyButton"
import axios from 'axios'

function Main() {
    const [products, setProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')

    const search = (product) => {
        const loweredTitle = product.title.toLowerCase()
        const loweredSearch = searchValue.toLowerCase()

        if(searchValue === ''){
            return <ProductCard product={product} key={product.id} />
        }
        if(loweredTitle.includes(loweredSearch)){
            return <ProductCard product={product} key={product.id} />
        }
    }
    
    useEffect(() => {  
        const getProducts = async() => {
            try {
                const response = await axios.get('http://localhost:3000/api/product/')
                setProducts(response.data.products)
            } catch (e) {
                setProducts([])
            }
        }
        getProducts()
    }, [])

    return (
			<div className='display'>
				<div className='header_wraper'>
					<Header setSearchValue={setSearchValue} searchValue={searchValue} />
				</div>
				{products && (
					<div className='products_display'>
						{products.map(product => search(product))}
					</div>
				)}
                {products.map(product => search(product)).every(el => el === undefined)  && <h1 className="no-elements">Nothing found</h1>}
			</div>
		)}

export default Main
