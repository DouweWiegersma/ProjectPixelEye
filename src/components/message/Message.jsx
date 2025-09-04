import styles from './Message.module.scss';
import {useEffect} from "react";

function Message({ text, status, clearMessage }) {
    if (!text) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            clearMessage();
        }, 3000);
        return () => clearTimeout(timer);
    }, [text, clearMessage]);

    const type = status === 'error' ? 'error' : 'success';

    return (
        <div className={`${styles.message} ${styles[type]}`}>
            {text}
        </div>
    );
}

export default Message;