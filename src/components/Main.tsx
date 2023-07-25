import { useState } from "react";
import { Backdrop, CircularProgress, Grid, TextField, styled } from "@mui/material"
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import Chat from "./Chat";
import { ChatCompletionRequestMessage } from "openai";
import { openai } from "./openai";

const StyledTextField = styled(TextField)({
    background: "rgba(64,65,79,1)",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        }
    }
});

const Main = () => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          await sendMessageUtil();
        }
    };

    const sendMessageUtil = async () => {
        setLoading(true);
        try {
            const newMessages = [...messages];
            newMessages.push({
                role: 'user',
                content: message
            })
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo-16k",
                messages: newMessages,
                temperature: 0.2,
                max_tokens: 100
            });
            const res = completion.data.choices[0].message;
            if (!res || !res.content)
                throw new Error('Could not summarise!');
            newMessages.push({
                role: 'assistant',
                content: res.content
            })
            setMessage('');
            setMessages(newMessages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const sendMessage = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        await sendMessageUtil();
    };

    return (
        <>
            <Grid container flexDirection="column" sx={{height: '100vh', position: 'relative', backgroundColor: '#343541'}}>
                <Grid item sx={{height: 'calc(100% - 56px)', width: '100vw', overflowY: 'auto'}}>
                    <Chat messages={messages} />
                </Grid>
                <Grid item sx={{position: 'absolute', bottom: 0, width: "100%" }}>
                    <StyledTextField onKeyDown={handleKeyDown} multiline value={message} onChange={e => setMessage(e.target.value)} fullWidth placeholder="Send a message" InputProps={{
                        endAdornment: <SendOutlinedIcon sx={{cursor: 'pointer', '&:hover': { opacity: 0.6 }}} onClick={sendMessage} />,
                        sx: {color: '#fff'}
                    }} />
                </Grid>
            </Grid>
            { 
                loading &&
                <Backdrop sx={{zIndex: 1000, color: '#fff'}} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </>
    )
}

export default Main