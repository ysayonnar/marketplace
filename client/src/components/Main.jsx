import { useEffect, useState } from "react"
import Header from "./Header"
import ProductCard from "./ProductCard"
import MyButton from "../UI/MyButton/MyButton"
import axios from 'axios'

function Main() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const indexOfLastNote = page * 8
	const indexOfFirstNote = indexOfLastNote - 8
	const displayedProducts = products.slice(indexOfFirstNote, indexOfLastNote)

    const prevHandle = () =>{
        if(page === 1){
            return
        }
        else{
            setPage(page - 1)
        }
    }

    const nextHandle = () =>{
        if(page * 8 > products.length)
        {
            return
        }
        setPage(page + 1)
    }

    
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
			<div className='display'>
				<div className='header_wraper'>
					<Header />
				</div>
				<div className='products_display'>
					{displayedProducts.map(product => {
						return <ProductCard product={product} key={product.id} />
					})}
				</div>
				<div className='pagination_wrapper'>
					<MyButton onClick={prevHandle}>Prev</MyButton>
					<h1
						style={{
                            userSelect: 'none',
                            width: '20px',
							color: '#2b0d22',
						}}
					>
						{page}
					</h1>
					<MyButton onClick={nextHandle}>Next</MyButton>
				</div>
			</div>
		)}

export default Main
