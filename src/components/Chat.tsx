import { Box } from "@mui/material"
import ChatItem from "./ChatItem"
import { ChatCompletionRequestMessage } from "openai";
import { generateRandomKey } from "./utils";

interface ChatProps {
    messages: ChatCompletionRequestMessage[];
}

const Chat: React.FC<ChatProps> = ({messages}) => {
  return (
    <Box>
        {
            messages.map(message => {
                return (
                    <ChatItem key={generateRandomKey()} role={message.role} message={message!.content} />
                )
            })
        }
    </Box>
  )
}

export default Chat