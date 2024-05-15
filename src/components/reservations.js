import React from 'react';
import '../styles/reservations.css';
import logo from "../assets/imgs/vr.webp";

function ReservaEquipos() {
    const redirectToReservations = () => {
        window.open('https://reservasdisc.virtual.uniandes.edu.co/', '_blank');
    };

    return (
        <div className="reserva-equipos">
            <div className="reserva-equipos-text">
                <h2>Reserva Equipos</h2>
                <p>¡Si ya estas dentro de la lista de prestamos del laboratorio, puedes darle en el siguiente botón y realizar tu reserva de equipos!</p>
            </div>
            <div className="reserva-equipos-action container">
                <div className="row">
                    <div className="col-6">
                        <button className="reserva-button" onClick={redirectToReservations}>RESERVA AQUÍ</button>
                    </div>
                    <div className="col-6">
                        <div className="reserva-equipos-image">
                            <img src={logo} alt="VR Headset"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservaEquipos;
