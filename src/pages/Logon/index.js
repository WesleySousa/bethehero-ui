import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

import './styles.css';

import api from '../../services/api';

export default function Logon() {
    const [ id, setId ] = useState('');

    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const response = await api.post('/sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert('Erro ao fazer logon, tente novamente.');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be The Hero" />

                <form onSubmit={ handleLogon }>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID" 
                        maxLength="256" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit"> Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho um cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImage} alt="Heroes" />
        </div>
    );
}