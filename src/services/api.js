(function() {
    const API = {
        getAllAlgorithms: async function() {
            return this._mockResponse('/db/algorithm_s.json', []);
        },
        getAllAlgorithms2: async function() {
            return this._mockResponse('/db/algorithms.json', []);
        },
        findAlgorithmById: async function(id) {
            if (!id) return {
                success: false,
                message: "Id manquant",
                data: null
            };
            
            try {
                const algorithms = await this._fetchJson('/db/algorithms.json');
                const algo = algorithms.find(item => item.id === id);
                return {
                    success: true,
                    message: "Found",
                    data: algo || null
                };
            } catch (e) {
                return this._errorResponse(e);
            }
        },
        getAllExercises: async function() {
            return this._mockResponse('/db/exe.json', []);
        },
        findExerciseByLink: async function(link) {
            if (!link) return {
                success: false,
                message: "Lien manquant",
                data: null
            };
            
            try {
                const exercises = await this._fetchJson('/db/exe.json');
                const exe = exercises.find(item => item.link === link);
                return {
                    success: true,
                    message: "Found",
                    data: exe || null
                };
            } catch (e) {
                return this._errorResponse(e);
            }
        },
        search: async function(query) {
            const q = query?.toLowerCase().trim();
            if (!q || q.length < 2) {
                return {
                    success: false,
                    message: "La recherche doit contenir au moins 2 caractères",
                    data: null
                };
            }

            try {
                const data = await this._fetchJson('/db/sugg.json');
                const results = { algorithms: [], exercises: [] };

                const searchInObject = (obj) => {
                    return Object.values(obj).some(val => 
                        typeof val === 'string' && val.toLowerCase().includes(q)
                    );
                };

                if (Array.isArray(data.algorithms)) {
                    results.algorithms = data.algorithms.filter(searchInObject);
                }

                if (Array.isArray(data.exercises)) {
                    results.exercises = data.exercises.filter(searchInObject);
                }

                return {
                    success: true,
                    message: "Résultats de recherche",
                    data: results
                };
            } catch (e) {
                return {
                    success: false,
                    message: "Erreur serveur",
                    data: null
                };
            }
        },
        getSuggestions: async function() {
            try {
                const data = await this._fetchJson('/db/sugg.json');
                const suggestions = new Set();

                if (Array.isArray(data.algorithms)) {
                    data.algorithms.forEach(algo => {
                        if (algo.title) suggestions.add(algo.title.split(' ')[0]);
                        if (algo.description) {
                            algo.description.split(' ').slice(0, 3).forEach(word => {
                                if (word.length > 3) suggestions.add(word);
                            });
                        }
                    });
                }

                if (Array.isArray(data.exercises)) {
                    data.exercises.forEach(ex => {
                        if (ex.name) suggestions.add(ex.name.split(' ')[0]);
                        if (ex.type) suggestions.add(ex.type);
                        if (ex.exercise) {
                            ex.exercise.split(' ').slice(0, 3).forEach(word => {
                                if (word.length > 3) suggestions.add(word);
                            });
                        }
                    });
                }

                return [...suggestions].filter(Boolean).slice(0, 15);
            } catch (e) {
                return [
                    "Algorithmes", "Exercices", "BacPratique", 
                    "Structures", "Contrôle", "Tableaux",
                    "Fonctions", "Chaînes", "Boucles", "Conditions"
                ];
            }
        },
        _fetchJson: async function(path) {
            const response = await fetch(path);
            if (!response.ok) throw new Error('Data not found');
            return response.json();
        },
        _mockResponse: async function(path, emptyValue) {
            try {
                const data = await this._fetchJson(path);
                if (!data || data.length === 0) {
                    return {
                        success: false,
                        message: "Aucune donnée trouvée",
                        data: emptyValue
                    };
                }
                return {
                    success: true,
                    message: "Données récupérées avec succès",
                    data: data
                };
            } catch (e) {
                return this._errorResponse(e);
            }
        },
        _errorResponse: function(error) {
            return {
                success: false,
                message: error.message || "Erreur serveur",
                data: null
            };
        }
    };

    window.AlgorithmAPI = API;
})();

export const searchAPi = (q) => {
    return window.AlgorithmAPI.search(q);
}

export const fetchSuggestions = () => {
    return window.AlgorithmAPI.getSuggestions();
}

export const fetchAllAlgorithms = () => {
    return window.AlgorithmAPI.getAllAlgorithms();
}

export const fetchAlgorithm = (id) => {
    return window.AlgorithmAPI.findAlgorithmById(id);
}

export const fetchExercices = () => {
    return window.AlgorithmAPI.getAllExercises();
}

export const fetchExercice = (link) => {
    return window.AlgorithmAPI.findExerciseByLink(link);
}