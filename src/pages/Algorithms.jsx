import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../Algorithms.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const getIconForTitle = (title) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("affichage")) return "bi bi-display";
  if (lowerTitle.includes("affectation")) return "bi bi-arrow-left-right";
  if (lowerTitle.includes("saisie")) return "bi bi-keyboard";
  if (lowerTitle.includes("fonction")) return "bi bi-calculator";
  if (lowerTitle.includes("structure")) return "bi bi-diagram-3";
  if (lowerTitle.includes("symbole")) return "bi bi-signpost-2";
  if (lowerTitle.includes("chaîne") || lowerTitle.includes("chaine")) return "bi bi-textarea";
  if (lowerTitle.includes("tableau")) return "bi bi-grid";
  if (lowerTitle.includes("sous-programme")) return "bi bi-code-slash";
  if (lowerTitle.includes("pratique")) return "bi bi-camera-video";
  
  return "bi bi-code-square";
};

function Algorithms() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllAlgorithms = async () => {
        return window.AlgorithmAPI.getAllAlgorithms();
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetchAllAlgorithms();
            
            if (response && response.success && response.data) {
                setData(response.data);
                setError(null);
            } else {
                setError(response?.message || "Erreur lors du chargement des données");
            }
        } catch (err) {
            setError("Erreur réseau: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <main className="algorithms-container">
                <div className="header-section animate__animated animate__fadeIn">
                    <h1 className="gradient-title">Algorithmes</h1>
                    <p className="subtitle">
                        Développez votre raisonnement et vos capacités de résolution de problèmes grâce à notre collection d'algorithmes fondamentaux.
                    </p>
                </div>

                {loading && (
                    <div className="loading-container animate__animated animate__fadeIn">
                        <div className="loader"></div>
                        <p>Chargement des algorithmes...</p>
                    </div>
                )}

                {error && (
                    <div className="error-alert animate__animated animate__shakeX">
                        <p>⚠️ {error}</p>
                        <button onClick={fetchData} className="retry-btn">
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Réessayer
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="cards-grid">
                        {data.map((item) => (
                            <div 
                                className="algorithm-card animate__animated animate__fadeInUp"
                                key={item.id}
                                onClick={() => navigate(`/algorithm/${item.url}`)}
                            >
                                <div className="card-header">
                                    <div className="card-icon">
                                        <i className={getIconForTitle(item.title)}></i>
                                    </div>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="card-body">
                                    <p>{item.description}</p>
                                    <div className="code-snippet">
                                        <code>{item.algo}</code>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="view-btn">
                                        Voir les détails
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}

export default Algorithms;