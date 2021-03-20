import {createStore} from "redux";
import {Provider} from "react-redux";
import TU from "./exam";
import mc from "./exam-reducer";


const ee = createStore(mc)

const YP = () =>
    <Provider store={ee}>
        <TU/>
    </Provider>


export default YP
