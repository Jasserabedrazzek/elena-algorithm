import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import SearchPage from "../components/SearchPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
    const [showSearch, setShowSearch] = useState(false);

    return(
        <>
            <Navbar />
            <main className="home-container">
                <div className="hero-section">
                    <h1>Elena Algorithmique</h1>
                    <p className="lead">
                        Explorez le monde de l'algorithmique et de la programmation
                    </p>
                    
                    <div className="search-container" onClick={() => setShowSearch(true)}>
                        <div className="input-group">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Rechercher algorithmes, exercices..."
                                readOnly
                            />
                            <button className="btn btn-primary">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                        <div className="quick-links">
                            <span>Suggestions:</span>
                            <button className="btn btn-sm">Algorithmes</button>
                            <button className="btn btn-sm">Exercices</button>
                            <button className="btn btn-sm">Bac Pratique</button>
                        </div>
                    </div>
                </div>
                
                <div className="features">
                    <div className="feature-card">
                        <i className="bi bi-code-slash"></i>
                        <h4>Algorithmes</h4>
                        <p>Découvrez des algorithmes fondamentaux avec explications détaillées</p>
                    </div>
                    <div className="feature-card">
                        <i className="bi bi-journal-code"></i>
                        <h4>Exercices</h4>
                        <p>Pratiquez avec des exercices corrigés de différents niveaux</p>
                    </div>
                    <div className="feature-card">
                        <i className="bi bi-camera-video"></i>
                        <h4>Bac Pratique</h4>
                        <p>Préparez-vous avec des sujets pratiques pour l'examen</p>
                    </div>
                </div>
            </main>
            <Footer />
            
            {showSearch && (
                <SearchPage onClose={() => setShowSearch(false)} />
            )}
        </>
    )
}

export default Home;