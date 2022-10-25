import { createContext } from "react";
const init = { id: "", email:"", password:""};
const GlobalContext = createContext(init);

export default GlobalContext;