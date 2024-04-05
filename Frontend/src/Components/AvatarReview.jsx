import { useFetchGetIdUser } from "../PeticionesHTTP/Usuarios/useFetchGetIdUser";

const AvatarReview = () => {
    const id = localStorage.getItem("id");
    const { user } = useFetchGetIdUser("http://localhost:8080/usuario/" + id);

    // Verificar si state.avatar y state.avatar.name existen antes de dividir el nombre
    const firstName = user?.nombre ? user.nombre.split(' ')[0] : '';
    const lastName = user?.apellido ? user.apellido.split(' ')[0] : '';

    // Obtener la primera letra del nombre y del apellido
    const firstLetterFirstName = firstName ? firstName.charAt(0) : '';
    const firstLetterLastName = lastName ? lastName.charAt(0) : '';

    return (
        <div className="flex items-center justify-center w-12 h-12  bg-[#005B8D] rounded-full shrink-0">
            <span className="font-light text-base text-white ">{firstLetterFirstName + firstLetterLastName}</span>
        </div>
    );
};

export default AvatarReview;
