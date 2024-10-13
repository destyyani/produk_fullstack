import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <header>
                <nav>
                    <div className="flex items-center space-x-4">
                        <Link to="/create" className="nav-link">
                         New Produk 
                        </Link>
                    </div>
                    <Link to="/" className="nav-link"> Home </Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}
