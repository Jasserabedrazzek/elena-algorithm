import React, { useState, useEffect } from 'react';
import { searchAPi } from '../services/api';
import SearchResults from './SearchResults';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SearchPage.css';

export default function SearchPage({ onClose }) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState({ algorithms: [], exercises: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);

        try {
            const response = await searchAPi(searchQuery);

            if (response.success) {
                setResults(response.data || { algorithms: [], exercises: [] });
            } else {
                setError(response.message || "Aucun résultat trouvé");
            }
        } catch (err) {
            setError("Erreur lors de la recherche");
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (typingTimeout) clearTimeout(typingTimeout);

        if (value.trim().length >= 2) {
            setTypingTimeout(
                setTimeout(() => handleSearch(value), 300)
            );
        } else if (value.trim().length === 0) {
            setResults({ algorithms: [], exercises: [] });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (typingTimeout) clearTimeout(typingTimeout);
        if (query.trim().length >= 2) {
            handleSearch(query);
        }
    };

    // Nettoyer le timeout si le composant est démonté
    useEffect(() => {
        return () => {
            if (typingTimeout) clearTimeout(typingTimeout);
        };
    }, [typingTimeout]);

    const highlightText = (text, highlight) => {
        if (!text || !highlight) return text;

        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase()
                ? <mark key={i}>{part}</mark>
                : part
        );
    };

    return (
        <div className="search-modal">
            <div style={{ height: "50px" }}></div>
            <div className="modal-header">
                <h3>Recherche en temps réel</h3>
                <button className="close-btn" onClick={onClose}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="search-form">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Rechercher algorithmes, exercices..."
                        value={query}
                        onChange={handleInputChange}
                        autoFocus
                    />
                    <button className="btn btn-primary" type="submit">
                        {loading ? (
                            <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                            <i className="bi bi-search"></i>
                        )}
                    </button>
                </div>
                <div className="input-hint">
                    {query.length > 0 && query.length < 2 && (
                        <span className="text-warning">
                            Entrez au moins 2 caractères
                        </span>
                    )}
                </div>
            </form>

            <div className="search-results-container">
                {error && <div className="alert alert-danger">{error}</div>}

                {loading && query.trim().length >= 2 && (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary"></div>
                        <p className="mt-2">Recherche en cours...</p>
                    </div>
                )}
                <div style={{ height: "50px" }}></div>
                {!loading && !error && (
                    <SearchResults
                        results={results}
                        query={query}
                        highlight={highlightText}
                    />
                )}
            </div>
        </div>
    );
}
