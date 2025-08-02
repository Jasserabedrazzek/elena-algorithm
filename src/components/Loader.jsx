import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const sleep = (ms) => {return new Promise(resolve => setTimeout(resolve, ms));}

function Loader() {
    const navigate = useNavigate();
    const Loading = async() => {
        await sleep(4000);
        navigate('/home')
    }
    useEffect(()=> {
        Loading();
    },[]);
    return (
        <div className="main-loader">
            <div className="spinner">
                <div className="spinnerin"></div>
            </div>
        </div>
    )
}

export default Loader;