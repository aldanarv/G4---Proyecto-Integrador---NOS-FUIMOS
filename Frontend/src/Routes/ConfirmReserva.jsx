import { Link } from "react-router-dom";
import styles from "../styles/confirmRegister.module.css";

const ConfirmReserva = () => {
  return (
    <article className={styles.container_login}>
      <div className={styles.login_title}>
        <article>
          <div className='flex flex-col sm:flex-row gap-4 items-center sm:items-start'>
            <img className="w-20 h-20" src="../../public/assets/circleCheck.png" alt="check-icon" />
            <div className='text-center sm:text-start'>
              <h2 className='text-2xl sm:text-4xl text-[#C15205] font-semibold'>¡Reserva realizada exitosamente!</h2>
              <p className='text-base mt-4 sm:mt-1'>Enviamos un correo a su bandeja de entrada, con los detalles de la reserva.</p>
            </div>
          </div>
          <div className='mt-8'>
            <div className="flex flex-col items-center justify-center gap-1">
              <Link to={"/history"} className='underline text-base text-[#C15205] mt-5'>
                Historial reservas
              </Link>
            </div>
          </div>
        </article>
      </div>
    </article>
  )
}

export default ConfirmReserva