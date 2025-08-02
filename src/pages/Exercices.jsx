import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../Exercices.css";

function Exercices() {
  const [exercices, setExercices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  const fetchExercices = async () => {
    return window.AlgorithmAPI.getAllExercises();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchExercices();
      setExercices(response.data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredExercices = exercices.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ex.exercise.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || ex.type.toLowerCase() === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Navbar />
      <main className="main py-5" id="main" style={{height:"max-content",minHeight:"100vh",maxHeight:"max-content"}}>
        <div className="container">
          <div className="header-section animate__animated animate__fadeIn">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
              <div>
                <h1 className="display-5 fw-bold mb-3">Bibliothèque d'exercices</h1>
                <p className="text-muted mb-0">
                  Parcourez notre collection d'exercices de programmation pour améliorer vos compétences
                </p>
              </div>
              <div className="d-flex gap-2 mt-3 mt-md-0">
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <i className="bi bi-arrow-up-circle me-2"></i>Haut de page
                </button>
              </div>
            </div>
            
            <div className="row mb-4">
              <div className="col-md-8 mb-3 mb-md-0">
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-secondary"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Rechercher un exercice par nom ou contenu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex gap-2">
                  <select 
                    className="form-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">Tous les types</option>
                    <option value="theorique">Théorique</option>
                  </select>
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("all");
                    }}
                  >
                    <i className="bi bi-arrow-counterclockwise"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="row mb-4">
              <div className="col-md-4 mb-3">
                <div className="stats-card bg-primary-gradient text-white p-3 rounded-4 shadow">
                  <h5 className="mb-0">Nombre total d'exercices</h5>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h2 className="mb-0">{exercices.length}</h2>
                    <i className="bi bi-journal-code display-6"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="stats-card bg-success-gradient text-white p-3 rounded-4 shadow">
                  <h5 className="mb-0">Théorique</h5>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h2 className="mb-0">
                      {exercices.filter(e => e.type === "Theorique").length}
                    </h2>
                    <i className="bi bi-lightbulb display-6"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="stats-card bg-purple-gradient text-white p-3 rounded-4 shadow">
                  <h5 className="mb-0">Bientôt disponible</h5>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h2 className="mb-0">12+</h2>
                    <i className="bi bi-hourglass-split display-6"></i>
                  </div>
                </div>
              </div>
            </div>
            
            {loading && (
              <div className="d-flex justify-content-center align-items-center py-5">
                <div className="spinner-grow text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="ms-3 mb-0">Chargement des exercices...</p>
              </div>
            )}
            
            {error && (
              <div className="alert alert-danger d-flex align-items-center" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                <div>
                  Erreur lors du chargement des exercices : {error.message}
                  <button 
                    className="btn btn-sm btn-outline-danger ms-3"
                    onClick={fetchData}
                  >
                    Réessayer
                  </button>
                </div>
              </div>
            )}
            
            {!loading && !error && filteredExercices.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-secondary mb-3"></i>
                <h3>Aucun exercice trouvé</h3>
                <p className="text-muted">
                  Essayez de modifier votre recherche ou vos filtres
                </p>
              </div>
            )}
            
            {!loading && !error && filteredExercices.length > 0 && (
              <div className="exercices-container">
                {filteredExercices.map((exercice) => (
                  <div 
                    className="exercice-card animate__animated animate__fadeInUp"
                    key={exercice.id}
                    onClick={() => navigate(`/exercice/${exercice.link}`)}
                  >
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <span className={`badge me-2 ${exercice.type === 'Theorique' ? 'bg-primary' : 'bg-warning'}`}>
                          {exercice.type}
                        </span>
                        <span className="text-muted small">ID : {exercice.id}</span>
                      </div>
                      <i className="bi bi-arrow-right-circle fs-4 text-primary"></i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{exercice.name}</h5>
                      <p className="card-text text-truncate">{exercice.exercise}</p>
                    </div>
                    <div className="card-footer bg-transparent border-0 d-flex justify-content-between">
                      <small className="text-muted">Cliquez pour voir le détail</small>
                      <div className="exercise-icons">
                        <i className="bi bi-code-slash me-2"></i>
                        <i className="bi bi-lightning-charge"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Exercices;