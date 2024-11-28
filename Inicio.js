// Función para verificar si hay un usuario logueado
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginButton = document.getElementById('loginButton');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');

    if (currentUser && currentUser.isLoggedIn) {
        // Ocultar botón de login y mostrar perfil
        loginButton.style.display = 'none';
        userProfile.style.display = 'block';
        userName.textContent = currentUser.name;
    } else {
        // Mostrar botón de login y ocultar perfil
        loginButton.style.display = 'block';
        userProfile.style.display = 'none';
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'Registro.html';
}

// Agregar event listener para el botón de cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
    // Verificar estado de login al cargar la página
    checkLoginStatus();

    // Configurar el botón de logout
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});