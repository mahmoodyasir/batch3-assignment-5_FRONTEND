import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'

const UserLayout = () => {
    return (
        <main className="flex flex-col min-h-screen">
            <NavBar/>
            <section className="flex-grow">
                <Outlet />
            </section>
        </main>
    )
}

export default UserLayout
