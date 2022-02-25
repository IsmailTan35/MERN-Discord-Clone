import "assets/style/panel.css"
import Dashboard from "views/Dashboard";
import ServerDashboard from "views/ServerDashboard";

import Sidebar from "components/Sidebar";
import { Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Panel = () => {
    const friends = useSelector(state => state.friends.items);
    const message = useSelector(state => state.user.message);
    const userID=useSelector(state => state.user.id);
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        if(location.pathname === "/" || friends.filter(friend => friend.id==location.pathname.split("/")[3]).length === 0) {
            history.push("/channels/@me")
        }
    }, [])
    useEffect(() => {
        var counter =message.filter(items => items.from != userID && items.read==false)
        if(counter.length<1) return
        document.title = `New Message (${counter.length})`

    },[message] )
    return(
        
        <div className="panelWrapper">
            <Sidebar/>
            <Route strict path="/channels/" component={Dashboard} />
            <Route path="/store" component={Dashboard} />
        </div>
        
    )
}
export default Panel;