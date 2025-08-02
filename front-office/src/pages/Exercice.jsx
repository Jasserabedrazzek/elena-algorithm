import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import "../Exercice.css";

export default function Exercice() {
    const { link } = useParams();
    const [exercice, setExercice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCorrection, setShowCorrection] = useState(false);

    useEffect(() => {
        const fetchExercice = async () => {
            try {
                setLoading(true);
                const response = await window.AlgorithmAPI.findExerciseByLink(link);
                if (response?.success && response.data) {
                    setExercice(response.data);
                    setError(null);
                } else {
                    setError(response?.message || "Exercice introuvable");
                }
            } catch (e) {
                setError("Erreur lors du chargement de l'exercice");
            } finally {
                setLoading(false);
            }
        };

        fetchExercice();
    }, [link]);

    const toggleCorrection = () => setShowCorrection(!showCorrection);

    const formatText = (text) => {
        if (typeof text !== "string") return null;
        return text.split("\n").map((line, idx) => (
            <React.Fragment key={idx}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger text-center">
                    <h4 className="alert-heading">Erreur</h4>
                    <p>{error}</p>
                    <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    if (!exercice) return null;

    return (
        <>
            <Navbar />
            <main className="main py-5" style={{ minHeight: "100vh" }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
                                <div className="card-header bg-primary text-white py-3 d-flex justify-content-between">
                                    <span className="badge bg-light text-primary fs-6">{exercice.type}</span>
                                    <span className="text-light fw-light">ID: {exercice.link}</span>
                                </div>

                                <div className="card-body p-4 p-md-5">
                                    <h2 className="card-title mb-4 text-primary">{exercice.name}</h2>

                                    <div className="exercise-content bg-light p-4 rounded-2 mb-4">
                                        <h5 className="text-muted mb-3">Énoncé:</h5>
                                        <p className="fs-5">{formatText(exercice.exercise)}</p>
                                    </div>

                                    <button
                                        className={`btn ${showCorrection ? 'btn-outline-danger' : 'btn-primary'} w-100 py-3 mb-4`}
                                        onClick={toggleCorrection}
                                    >
                                        <i className={`bi ${showCorrection ? 'bi-eye-slash' : 'bi-eye'} me-2`}></i>
                                        {showCorrection ? 'Masquer la correction' : 'Voir la correction'}
                                    </button>

                                    {showCorrection && (
                                        <div className="correction-content border-start border-4 border-success px-4 py-3 bg-light">
                                            <h5 className="text-success mb-3">Correction:</h5>
                                            <pre className="fs-5 font-monospace text-dark">
                                                {formatText(exercice.correction)}
                                            </pre>
                                        </div>
                                    )}
                                </div>

                                <div className="card-footer bg-light py-3 text-center text-muted">
                                    <small>Exercice chargé avec succès</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
