import style from './SuperFriendsWrapper.module.css'

import ChatWindow from "./ChatWindow";
import Navbar from "./Navbar";

function SuperFriendsWrapper() {
    return <>
        <div className={style.window}>
            <Navbar />
            <ChatWindow />
        </div>
    </>
}

export default SuperFriendsWrapper;