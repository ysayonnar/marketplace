import classes from './MyButton.module.css'

function MyButton(props) {
    return(
        <button className={classes.myButton} {...props}>{props.children}</button>
    )
}

export default MyButton