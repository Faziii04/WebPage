// Mantener la funcionalidad de cambio entre formularios
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const loginText = document.querySelector(".title-text .login");
const signupText = document.querySelector(".title-text .signup");

signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});

loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});

signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});

// Función para mostrar mensajes
function showMessage(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.querySelector('.close-button');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Función para leer archivo de usuario
async function readUserFile(email) {
    try {
        const response = await fetch(`registros/${email}.txt`);
        if (!response.ok) throw new Error('Usuario no encontrado');
        const content = await response.text();
        return content;
    } catch (error) {
        throw new Error('Usuario no encontrado');
    }
}

// Manejo del formulario de registro
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    if (formData.get('password') !== formData.get('confirmPassword')) {
        showMessage('Las contraseñas no coinciden');
        return;
    }

    const userData = `Email: ${formData.get('email')}\nPassword: ${formData.get('password')}\nName: ${formData.get('name')}\n`;
    
    // Guardar en la carpeta registros usando localStorage temporalmente
    localStorage.setItem(`user_${formData.get('email')}`, userData);
    
    showMessage('Registro exitoso');
    this.reset();
});

// ... (mantén todo el código anterior igual hasta el manejo del login)

// Manejo del formulario de login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Buscar usuario en localStorage
    const userData = localStorage.getItem(`user_${email}`);
    
    if (!userData) {
        showMessage('Usuario no encontrado');
        return;
    }

    const lines = userData.split('\n');
    let storedPassword = '';
    let userName = '';
    
    lines.forEach(line => {
        if (line.startsWith('Password:')) {
            storedPassword = line.split('Password:')[1].trim();
        }
        if (line.startsWith('Name:')) {
            userName = line.split('Name:')[1].trim();
        }
    });
    
    if (storedPassword === password) {
        // Guardar información de sesión
        localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            name: userName,
            isLoggedIn: true
        }));
        
        showMessage('Login exitoso');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showMessage('Contraseña incorrecta');
    }
});