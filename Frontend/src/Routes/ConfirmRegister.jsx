import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetchPostConfirmRegister } from "../PeticionesHTTP/Usuarios/useFetchPostConfirmRegister";
import styles from "../styles/confirmRegister.module.css";

const ConfirmRegister = () => {
  const { fetchDataUsers } = useFetchPostConfirmRegister("http://localhost:8080/usuario/confirmacion-email");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Debe ser un correo electrónico válido").lowercase().trim().required("El correo electrónico es requerido"),
    }),

    onSubmit: (data, { resetForm }) => {
      console.log("Submitted Data:", data);

      let user = {
        email: data.email,
      };

      fetchDataUsers(user);
      resetForm();
    },
    validateOnChange: false
  });

  return (
    <article className={styles.container_login}>
      <div className={styles.login_title}>
        <article>
          <div className='flex flex-col sm:flex-row gap-4 items-center sm:items-start'>
            <img className="w-20 h-20" src="../../public/assets/circleCheck.png" alt="check-icon" />
            <div className='text-center sm:text-start'>
              <h2 className='text-2xl sm:text-4xl text-[#C15205] font-semibold'>¡Te has registrado con éxito!</h2>
              <p className='text-base mt-4 sm:mt-1'>Enviamos un correo de confirmación a su bandeja de entrada.</p>
            </div>
          </div>
          <div className='mt-8'>
            <form onSubmit={formik.handleSubmit}>
              <div className="flex flex-col items-center justify-center gap-1">
                <p className='text-base font-light'>¿No has recibido el correo?</p>
                <div className='w-full sm:w-4/5'>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Correo electrónico"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="block w-full placeholder-[#0000003b] text-sm rounded-md border border-[#666666] bg-white px-2 py-2.5 text-black focus:outline-none"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 font-light text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
                <button type='submit' className='underline text-base text-[#C15205] mt-5'>Reenviar correo</button>
              </div>
            </form>
          </div>
        </article>
      </div>
    </article>
  )
}

export default ConfirmRegister