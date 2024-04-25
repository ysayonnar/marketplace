import classes from './MyInput.module.css'

function MyInput(props){
    return(
        <input className={classes.myInput} type="text" {...props}/>
    )
}

export default MyInput