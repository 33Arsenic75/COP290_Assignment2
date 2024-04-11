import './App.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#FFFFFF1A' }}>
            <div className="container d-flex">
                <Link className="navbar-brand" to="/">ChAAD</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link text-decoration-none text-black">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/game" className="nav-link text-decoration-none text-black">Game</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/cupgame" className="nav-link text-decoration-none text-black">Cup Game</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/memorymatching" className="nav-link text-decoration-none text-black">Memory Matching</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/trial" className="nav-link text-decoration-none text-black">Trial</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
