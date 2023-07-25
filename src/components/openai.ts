import { Configuration, OpenAIApi } from "openai";
import { API_KEY } from "./api-key";

const configuration = new Configuration({
    apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);
export { openai };