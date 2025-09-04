import styles from './Spinner.module.scss'
import { ImSpinner3 } from "react-icons/im";

function Spinner({
     border='',
     size='',
     spinner='',
     container='',
                 })
{
        const borderClass = styles[border] || '';
        const sizeClass = styles[size] || '';
        const spinnerClass = styles[spinner] || '';
        const containerClass = styles[container] || '';
    return(
    <>

                <ImSpinner3  className={`${spinnerClass} ${borderClass} ${sizeClass} ${containerClass}`}/>

    </>
        )}


export default Spinner;