import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Algorithm() {
    const { url } = useParams();
    const id = url;
    const [algorithm, setAlgorithm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchAlgorithm = async (id) => {
        return window.AlgorithmAPI.findAlgorithmById(id);
    };

    const getAlgorithm = async (id) => {
        try {
            const response = await fetchAlgorithm(id);
            if (response.success && response.data) {
                setAlgorithm(response.data);
                setLoading(false);
                setError(null);
            } else {
                setError("Algorithm not found");
                setLoading(false);
                setAlgorithm(null);
            }
        } catch (err) {
            setError("Failed to fetch algorithm data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        getAlgorithm(id);
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center py-5">
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    if (!algorithm) {
        return (
            <div className="container text-center py-5">
                <div className="alert alert-warning">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    No algorithm data available
                </div>
            </div>
        );
    }

    const isVideoType = algorithm.video_embed_1;

    return (
        <>
            <Navbar />
            <main className="main py-5" id="main" style={{ height: "max-content", minHeight: "100vh", maxHeight: "max-content" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <h1 className="mb-4 text-primary">
                                <i className={`bi ${isVideoType ? 'bi-play-btn' : 'bi-code-square'} me-2`}></i>
                                {algorithm.title}
                            </h1>
                            {isVideoType ? (
                                <>
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
                                        <img
                                            src={algorithm.channel_img}
                                            alt={algorithm.channel_name}
                                            className="rounded-circle me-3"
                                            style={{ width: '60px', height: '60px' }}
                                        />
                                        <div>
                                            <h5 className="mb-0">{algorithm.channel_name}</h5>
                                            <a
                                                href={algorithm.channel_id}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-decoration-none"
                                            >
                                                <i className="bi bi-youtube me-1 text-danger"></i>
                                                Visit Channel
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row row-cols-1 g-4">
                                        {algorithm.video_embed_1 && (
                                            <div className="col">
                                                <h4 className="mb-3">
                                                    <i className="bi bi-play-circle me-2 text-success"></i>
                                                    {algorithm.video_title_1}
                                                </h4>
                                                <div
                                                    className="ratio ratio-16x9 border rounded overflow-hidden"
                                                    dangerouslySetInnerHTML={{ __html: algorithm.video_embed_1 }}
                                                />
                                            </div>
                                        )}
                                        {algorithm.video_embed_2 && (
                                            <div className="col">
                                                <h4 className="mb-3">
                                                    <i className="bi bi-play-circle me-2 text-success"></i>
                                                    {algorithm.video_title_2}
                                                </h4>
                                                <div
                                                    className="ratio ratio-16x9 border rounded overflow-hidden"
                                                    dangerouslySetInnerHTML={{ __html: algorithm.video_embed_2 }}
                                                />
                                            </div>
                                        )}
                                        {algorithm.video_embed_3 && (
                                            <div className="col">
                                                <h4 className="mb-3">
                                                    <i className="bi bi-play-circle me-2 text-success"></i>
                                                    {algorithm.video_title_3}
                                                </h4>
                                                <div
                                                    className="ratio ratio-16x9 border rounded overflow-hidden"
                                                    dangerouslySetInnerHTML={{ __html: algorithm.video_embed_3 }}
                                                />
                                            </div>
                                        )}
                                        {algorithm.video_embed_4 && (
                                            <div className="col">
                                                <h4 className="mb-3">
                                                    <i className="bi bi-play-circle me-2 text-success"></i>
                                                    {algorithm.video_title_4}
                                                </h4>
                                                <div
                                                    className="ratio ratio-16x9 border rounded overflow-hidden"
                                                    dangerouslySetInnerHTML={{ __html: algorithm.video_embed_4 }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="card border-primary mb-4">
                                        <div className="card-header bg-primary text-white">
                                            <i className="bi bi-card-text me-2"></i>
                                            Description
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text">{algorithm.description}</p>
                                        </div>
                                    </div>
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="card h-100 border-info">
                                                <div className="card-header bg-info text-white">
                                                    <i className="bi bi-diagram-3 me-2"></i>
                                                    Algorithm
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">Pseudocode:</h5>
                                                    <pre className="bg-light p-3 rounded">{algorithm.algo}</pre>
                                                    <h5 className="card-title mt-4">Example:</h5>
                                                    <pre className="bg-light p-3 rounded">{algorithm.code_algo}</pre>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card h-100 border-warning">
                                                <div className="card-header bg-warning text-dark">
                                                    <i className="bi bi-code-slash me-2"></i>
                                                    Python
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">Python Syntax:</h5>
                                                    <pre className="bg-light p-3 rounded">{algorithm.py_el}</pre>
                                                    <h5 className="card-title mt-4">Example:</h5>
                                                    <pre className="bg-light p-3 rounded">{algorithm.code_python}</pre>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {algorithm.use_function && (
                                        <div className="card border-success mt-4">
                                            <div className="card-header bg-success text-white">
                                                <i className="bi bi-gear me-2"></i>
                                                Function Implementation
                                            </div>
                                            <div className="card-body">
                                                <pre className="bg-light p-3 rounded">{algorithm.use_function}</pre>
                                            </div>
                                        </div>
                                    )}
                                    {algorithm.comments && (
                                        <div className="card border-secondary mt-4">
                                            <div className="card-header bg-secondary text-white">
                                                <i className="bi bi-chat-square-text me-2"></i>
                                                Comments & Notes
                                            </div>
                                            <div className="card-body">
                                                <pre className="bg-light p-3 rounded">{algorithm.comments}</pre>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Algorithm;