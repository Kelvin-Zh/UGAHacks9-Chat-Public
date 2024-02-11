import style from './ChatBubble.module.css';

function ChatBubble(props: {message: string}) {
    return <>
    <div className={style.container}>
        <p className={style.message}>{props.message}</p>
    </div>
    </>
}

export default ChatBubble;