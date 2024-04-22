import classes from './Search.module.css'

function Search(props){
    return(
        <input className={classes.search} type="text" {...props}/>
    )
}

export default Search