import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";


export default cleanEnv(process.env, {
    DB_URI: str(),
    PORT: port(),
});