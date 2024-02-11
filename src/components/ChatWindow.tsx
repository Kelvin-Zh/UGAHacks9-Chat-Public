
import { useState, useEffect, useRef } from 'react';
import ChatBubble from "./ChatBubble";
import ChatResponse from "./ChatResponse";
import style from "./ChatWindow.module.css";
import _ from "lodash";
import OpenAI from "openai";
import.meta.env.VITE_OPENAI_API_KEY;
function ChatWindow() {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const [messages, setMessages] = useState<string[]>([]);
    const [superImage, setSuperImage] = useState<string>('')
    const [input, setInput] = useState<string>('');
    const [superHero, setSuperHero] = useState<string>("") ;
    const [imageTimeout, setImageTimeout] = useState<NodeJS.Timeout | null>(null);
    const memoedHero = _.memoize(heroImage);

    function formHandler(event:any) {
        event.preventDefault();
        setMessages([...messages, input]);
        setInput('');
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  const location = window.location.href;


    useEffect(() => {
        // Debounce the message to limit the frequency of API calls
        if (superHero !== "") {
           memoedHero();
        }
    }, [superHero])

    useEffect(() => {
        if (imageTimeout) {
        clearTimeout(imageTimeout);
    }
    const timeout = setTimeout(() => {
        if (location) {
        let supName = location
            .slice(location.lastIndexOf("/"), location.length)
            .substring(1);
        setSuperHero(supName);
        }
    }, 1000); // Adjust the delay as needed
    setImageTimeout(timeout);

    return () => {
        if (imageTimeout) {
        clearTimeout(imageTimeout);
        }
    };
    }, [superHero]);

async function heroImage() {
    if(superImage !="")
    {
        return;
    }
    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
        baseURL:
          "https://gateway.ai.cloudflare.com/v1/e2a9a8a44093f7a6408eaba82da88b13/superfriends/openai",
    });
    try{
        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: "hyperealistic photo of " + superHero + " the superhero based off The Marvel or DC comic universes",
            n: 1,
            size:'512x512',
        });
        const image_url = response.data[0].url ??"";
        setSuperImage(image_url)
    } catch (error) {
        console.error("Error:", error);
    }
};


    return <>
        <div className={style.container}>
            
          {superImage == "" ? <img width={512} height={512} src='/byte.png'></img> :<img src={superImage} width={512} height={512} />}
            <div className={style.messageContainer}>
                {messages.map(function(message, i) {
                    return <>
                        <ChatBubble message={message} key={(i * 2)}/>
                        <ChatResponse message={message} superhero={superHero} key={(i * 2) - 1}/>
                    </>
                })}
                <div ref={messagesEndRef} />
            </div>

        </div>
            <form className={style.inputForm} onSubmit={formHandler}>
                    <input type='text' onChange={(event) => {setInput(event.target.value)}} className={style.chatInput} placeholder='Talk to your favorite hero here!' value={input}/>
                    <input type='submit' hidden/>
            </form>

    </>
  ;
}

export default ChatWindow;
