import styles from './Button.module.scss';

function Button({
                    label,
                    onClick,
                    type='button',
                    className= '',
                    variant='',
                    size='',
                    shape =''
})
{
    const variantClass = styles[variant] || '';
    const sizeClass = styles[size] || '';
    const shapeClass = styles[shape] || '';

    return(

        <>
            <button type={type}
                    onClick={onClick}
                    className={`${styles['button']} 
                    ${variantClass} ${sizeClass} ${className} ${shapeClass}`}>
                {label}
            </button>
        </>
    )
}

export default Button;