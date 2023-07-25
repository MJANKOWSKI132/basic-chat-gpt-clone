import { Grid, Typography } from "@mui/material"
import { ChatCompletionResponseMessageRoleEnum } from "openai";

interface ChatItemProps {
    role: ChatCompletionResponseMessageRoleEnum;
    message: string | undefined;
}

const ChatItem: React.FC<ChatItemProps> = ({ role, message }) => {
  return (
    <Grid container sx={{p: 6, backgroundColor: role === 'assistant' ? '#444654' : '#343541', display: 'flex', flexDirection: role === 'assistant' ? 'row-reverse' : 'row'}}>
        <Grid item>
            <Typography sx={{color: '#fff', whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}>{message}</Typography>
        </Grid>
    </Grid>
  )
}

export default ChatItem