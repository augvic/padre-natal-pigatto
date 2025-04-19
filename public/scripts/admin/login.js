import { auth } from '../../firebase/firebase-config.js';
import { signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('senha');  // Corrigido aqui
const loginButton = document.getElementById('login-btn');

// Adiciona o evento ao botão de submit do formulário
loginButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Login realizado com sucesso:', user);

    window.location.href = '../../pages/admin/post.html';
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    alert('Email ou senha inválidos.'); // Mostrando alerta em caso de erro
  }
});
