import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Servicio no autorizado</h1>
            <br />
            <p>No tienes acceso a la pagina que solicitas.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Ir atrás</button>
            </div>
        </section>
    )
}

export default Unauthorized
