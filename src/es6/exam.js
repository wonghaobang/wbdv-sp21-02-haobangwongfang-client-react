import {BrowserRouter as ABC, Link, Route} from 'react-router-dom'
import DEF from './A'


const NavigationComponent = () => (
    <ABC>
        <Link to="/GHI">SOME LINK</Link>
        <Route path='/GHI' component={DEF}/>
    </ABC>
)

export default NavigationComponent


