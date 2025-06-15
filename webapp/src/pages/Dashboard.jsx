import AddItem from "../components/AddItem";
import LogoutButton from "../components/LogoutButton";

function Dashboard(){
    return(
        <div>
            <h1>Bakery Owner Dashboard</h1>
            <AddItem />
            <LogoutButton />

        </div>
    );
}

export default Dashboard;