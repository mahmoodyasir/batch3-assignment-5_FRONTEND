import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

const UserLayout = () => {
    return (
        <main className="flex flex-col min-h-screen">
            <NavBar />
            <section className="flex-grow">
                <Outlet />
            </section>
            <Footer />
        </main>
    )
}

export default UserLayout
