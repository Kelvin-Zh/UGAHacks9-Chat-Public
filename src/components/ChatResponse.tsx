import { useEffect, useState } from "react";
import style from "./ChatResponse.module.css";

import OpenAI from "openai";
import _ from "lodash";
import.meta.env.VITE_OPENAI_API_KEY;

function ChatResponse(props: { message: string; superhero: string }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [debouncedMessage, setDebouncedMessage] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const memoedRespond = _.memoize(run);

  useEffect(() => {
    // Debounce the message to limit the frequency of API calls
    if (debouncedMessage !== "") {
      memoedRespond(debouncedMessage);
    }
  }, [debouncedMessage]);

  useEffect(() => {
    // Set a debounce timeout to trigger the API call after a delay
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      setDebouncedMessage(props.message);
    }, 1000); // Adjust the delay as needed
    setDebounceTimeout(timeout);

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [props.message]);


  async function run(m: string) {
    
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
      baseURL:
        "https://gateway.ai.cloudflare.com/v1/e2a9a8a44093f7a6408eaba82da88b13/superfriends/openai",
    });
    const name = props.superhero == "" ? "Byte The Dog": props.superhero;
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0613",
        messages: [
          {
            role: "system",
            content:
              "You are a super hero named " +
              name +
              ". You're speaking to a kid. Stay in character. Never talk like a robot. Make sure to use sayings " +
              name +
              " would use",
          },
          {
            role: "user",
            content: m,
          },
        ],
        max_tokens: 1000,
      });

      const response = chatCompletion.choices[0]?.message.content ?? "";
      setResponseMessage(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <div className={style.container}>
        {responseMessage == "" ? (
          <div className={style.message}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <circle cx="4" cy="12" r="3" fill="currentColor">
                <animate
                  id="svgSpinners3DotsBounce0"
                  attributeName="cy"
                  begin="0;svgSpinners3DotsBounce1.end+0.25s"
                  calcMode="spline"
                  dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                  values="12;6;12"
                />
              </circle>
              <circle cx="12" cy="12" r="3" fill="currentColor">
                <animate
                  attributeName="cy"
                  begin="svgSpinners3DotsBounce0.begin+0.1s"
                  calcMode="spline"
                  dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                  values="12;6;12"
                />
              </circle>
              <circle cx="20" cy="12" r="3" fill="currentColor">
                <animate
                  id="svgSpinners3DotsBounce1"
                  attributeName="cy"
                  begin="svgSpinners3DotsBounce0.begin+0.2s"
                  calcMode="spline"
                  dur="0.6s"
                  keySplines=".33,.66,.66,1;.33,0,.66,.33"
                  values="12;6;12"
                />
              </circle>
            </svg>
          </div>
        ) : (
          <p className={style.message}>{responseMessage}</p>
        )}
      </div>
    </>
  );
}

export default ChatResponse;
