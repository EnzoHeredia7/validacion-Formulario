// Inicializar Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB7PpwUOzr8xrSoYgavbY8jie00Pg5riY4",
    authDomain: "proyecto-datos-formulari-c5562.firebaseapp.com",
    projectId: "proyecto-datos-formulari-c5562",
    storageBucket: "proyecto-datos-formulari-c5562.appspot.com",
    messagingSenderId: "514334377740",
    appId: "1:514334377740:web:98bea331479ae0e9ae2b29",
    measurementId: "G-EP0TQ9PEJM"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Manejar el formulario
document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, introduce tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');
    }

    // Validar correo electrónico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, introduce un email válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    // Validar contraseña
    let contraseñaEntrada = document.getElementById('password');
    let contraseñaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contraseñaEntrada.value)) {
        contraseñaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, carácter especial, mayúscula';
        contraseñaError.classList.add('error-message');
    } else {
        contraseñaError.textContent = '';
        contraseñaError.classList.remove('error-message');
    }

    // Si no hay errores, enviar los datos a Firebase Firestore
    if (!errorNombre.textContent && !emailError.textContent && !contraseñaError.textContent) {
        try {
            const docRef = await db.collection("users").add({
                nombre: entradaNombre.value,
                email: emailEntrada.value,
                password: contraseñaEntrada.value
            });
            console.log("Document written with ID: ", docRef.id);
            alert('El formulario se ha enviado con éxito');
            document.getElementById('formulario').reset();
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
});
