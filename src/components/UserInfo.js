import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './UserInfo.scss';

const UserInfo = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userIdFromCookie = Cookies.get('userId');

        if (!userIdFromCookie) {
          console.error('Usuário não autenticado.');
          navigate('/');
          return;
        } else {
          const response = await axios.get(`https://dummyjson.com/users/${userIdFromCookie}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Falha ao buscar informações do usuário:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('token');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div className="user-info-container">
      {userData && (
        <>
          <button className="logout-button" onClick={handleLogout}>Sair</button>

          <div className="user-main-infos">
            <img
              className="user-info-image"
              src={userData.image}
              alt={`Imagem de ${userData.username}`}
            />
            <div className="user-info-details">
              <ul className="user-info-list">
                <li className="user-info-list-item">
                  <label>#{userData.id}</label> {userData.username}
                </li>
                <li className="user-info-list-item">
                  <label>Nome:</label> {userData.firstName} {userData.lastName}
                </li>
                <li className="user-info-list-item">
                  <label>Gênero:</label> {userData.gender}
                </li>
                <li className="user-info-list-item">
                  <label>Email:</label> {userData.email}
                </li>
                <li className="user-info-list-item">
                  <label>Idade:</label> {userData.age}
                </li>
                <li className="user-info-list-item">
                  <label>Data de Nascimento:</label> {userData.birthDate}
                </li>
              </ul>
            </div>
          </div>

          <div className="user-info-details">
            <ul className="user-info-list">
              <li className="user-info-list-item">
                <label>Endereço:</label> {userData.address.address}, {userData.address.city}, {userData.address.state}, {userData.address.postalCode}
              </li>
              <li className="user-info-list-item">
                <label>Idade:</label> {userData.age}
              </li>
              <li className="user-info-list-item">
                <label>Data de Nascimento:</label> {userData.birthDate}
              </li>
              <li className="user-info-list-item">
                <label>Tipo Sanguíneo:</label> {userData.bloodGroup}
              </li>
              <li className="user-info-list-item">
                <label>Empresa:</label> {userData.company.name}
              </li>
              <li className="user-info-list-item">
                <label>Departamento:</label> {userData.company.department}
              </li>
              <li className="user-info-list-item">
                <label>Cargo:</label> {userData.company.title}
              </li>
              <li className="user-info-list-item">
                <label>Domínio:</label> {userData.domain}
              </li>
              <li className="user-info-list-item">
                <label>Ein:</label> {userData.ein}
              </li>
              <li className="user-info-list-item">
                <label>Cor dos Olhos:</label> {userData.eyeColor}
              </li>
              <li className="user-info-list-item">
                <label>Altura:</label> {userData.height}
              </li>
              <li className="user-info-list-item">
                <label>Peso:</label> {userData.weight}
              </li>
              <li className="user-info-list-item">
                <label>Cor do cabelo:</label> {userData.hair.color}
              </li>
              <li className="user-info-list-item">
                <label>Tipo do cabelo:</label> {userData.hair.type}
              </li>
              <li className="user-info-list-item">
                <label>IP:</label> {userData.ip}
              </li>
              <li className="user-info-list-item">
                <label>Endereço MAC:</label> {userData.macAddress}
              </li>
              <li className="user-info-list-item">
                <label>Telefone:</label> {userData.phone}
              </li>
              <li className="user-info-list-item">
                <label>SSN:</label> {userData.ssn}
              </li>
              <li className="user-info-list-item">
                <label>Universidade:</label> {userData.university}
              </li>
              <li className="user-info-list-item">
                <label>User Agent:</label> {userData.userAgent}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfo;
