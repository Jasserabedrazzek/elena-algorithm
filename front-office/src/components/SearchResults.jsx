import React from 'react';

const SearchResults = ({ results = { algorithms: [], exercises: [] }, query, highlight }) => {
    // Vérification que results existe et a les propriétés nécessaires
    const algorithms = results?.algorithms || [];
    const exercises = results?.exercises || [];
    
    return (
        <div className="search-results">
            
            {algorithms.length > 0 && (
                <section className="result-section">
                    <h4 className="section-title">
                        <i className="bi bi-code-slash"></i> Algorithmes
                        <span className="badge bg-primary ms-2">{algorithms.length}</span>
                    </h4>
                    <div className="results-grid">
                        {algorithms.map(algo => (
                            <div key={algo.id} className="result-card">
                                <h5>{highlight(algo.title, query)}</h5>
                                <p>{highlight(algo.description, query)}</p>
                                <div className="code-snippet">
                                    <pre>{highlight(algo.algo, query)}</pre>
                                </div>
                                <a href={`/algorithm/${algo.url}`} className="btn btn-sm btn-outline-primary">
                                    Voir détails <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {exercises.length > 0 && (
                <section className="result-section">
                    <h4 className="section-title">
                        <i className="bi bi-journal-code"></i> Exercices
                        <span className="badge bg-primary ms-2">{exercises.length}</span>
                    </h4>
                    <div className="results-grid">
                        {exercises.map(ex => (
                            <div key={ex.id} className="result-card">
                                <h5>{highlight(ex.name, query)}</h5>
                                <p className="badge bg-info">{ex.type}</p>
                                <p>{highlight(ex.exercise, query)}</p>
                                <a href={`/exercise/${ex.link}`} className="btn btn-sm btn-outline-primary">
                                    Voir correction <i className="bi bi-journal-check"></i>
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {algorithms.length === 0 && exercises.length === 0 && query.length >= 2 && (
                <div className="no-results">
                    <i className="bi bi-search-heart"></i>
                    <h5>Aucun résultat trouvé</h5>
                    <p>Essayez d'autres termes de recherche</p>
                </div>
            )}
        </div>
    );
};

export default SearchResults;