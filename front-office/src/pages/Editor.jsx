import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaStop, FaFile, FaFolderOpen, FaSave } from "react-icons/fa";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

function Editor() {
  const [code, setCode] = useState("# Write your Python code here\n");
  const [output, setOutput] = useState("Python (© Powered by Elena Algorithme - 2025)\n");
  const pyodideRef = useRef(null);
  const runAbortController = useRef(null);

  // Charger Pyodide une seule fois au montage
  useEffect(() => {
    async function loadPyodideAndPackages() {
      setOutput((o) => o + "\nLoading Python runtime...");
      pyodideRef.current = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
      });
      setOutput((o) => o + "\nPython runtime loaded.\n");
    }
    loadPyodideAndPackages();
  }, []);

  // Nouveau fichier
  function newFileFunction() {
    if (window.confirm("Voulez-vous vraiment créer un nouveau fichier ? Le code non sauvegardé sera perdu.")) {
      setCode("");
      setOutput("Nouveau fichier créé.\n");
    }
  }

  // Ouvrir fichier local
  function openFileFunction() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".py,text/plain";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        setCode(evt.target.result);
        setOutput(`Fichier '${file.name}' chargé.\n`);
      };
      reader.readAsText(file);
    };
    input.click();
  }

  // Sauvegarder fichier
  function saveFunction() {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "script.py";
    a.click();
    URL.revokeObjectURL(url);
    setOutput("Fichier sauvegardé.\n");
  }

  // Exécuter code Python
  async function runCodeFunction() {
    if (!pyodideRef.current) {
      setOutput((o) => o + "\nLe runtime Python n'est pas encore chargé.");
      return;
    }
    setOutput("Exécution du code...\n");
    try {
      runAbortController.current = new AbortController();
  
      // إعادة توجيه stdout
      pyodideRef.current.runPython(`
  import sys
  from io import StringIO
  sys.stdout = StringIO()
  sys.stderr = StringIO()
  `);
  
      await pyodideRef.current.runPythonAsync(code, { signal: runAbortController.current.signal });
  
      // الحصول على ما طبعناه
      const stdout = pyodideRef.current.runPython("sys.stdout.getvalue()");
      const stderr = pyodideRef.current.runPython("sys.stderr.getvalue()");
  
      let combinedOutput = "";
      if (stdout) combinedOutput += stdout;
      if (stderr) combinedOutput += "\nErreur:\n" + stderr;
  
      setOutput((o) => o + combinedOutput + "\n");
  
    } catch (error) {
      if (error.name === "AbortError") {
        setOutput((o) => o + "\nExécution arrêtée par l'utilisateur.\n");
      } else {
        setOutput((o) => o + "\nErreur : " + error.message + "\n");
      }
    }
  }
  

  // Arrêter exécution (Abort Pyodide)
  function stopCodeFunction() {
    if (runAbortController.current) {
      runAbortController.current.abort();
      runAbortController.current = null;
    }
  }

  return (
    <>
      <Navbar />
      <main id="main" className="main" style={{ padding: "1rem",background:'#16172b' }}>
        <div className="widget-code" style={{background:'#16172b' }}>
          <button className="btn text-light" title="Nouveau" onClick={newFileFunction}><FaFile /></button>
          <button className="btn text-warning" title="Ouvrir" onClick={openFileFunction}><FaFolderOpen /></button>
          <button className="btn text-primary" title="Enregistrer" onClick={saveFunction}><FaSave /></button>
          <button className="btn text-success" title="Exécuter" onClick={runCodeFunction}><FaPlay /></button>
          <button className="btn text-danger" title="Arrêter" onClick={stopCodeFunction}><FaStop /></button>
        </div>
        <textarea
          id="editor"
          className="form-control"
          style={{ width: "100%", height: "300px", fontFamily: "monospace", fontSize: "1rem" }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <pre
          className="console-widgets-code alert alert-dark"
          id="output"
          style={{ height: "200px", overflowY: "auto", marginTop: "1rem", whiteSpace: "pre-wrap" }}
        >
          {output}
        </pre>
      </main>
      <Footer />
    </>
  );
}

export default Editor;
