import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';   // Inicializa las variables
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Lógica para iniciar sesión
  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Inicio de sesión exitoso');
    } catch (error:any) {
      alert('Error al iniciar sesión: ' + error.message);
    }
  }
    // Lógica para redirigir al registro
    onRegister() {
      // Redirige a la página de registro
      this.router.navigate(['/register']); // Asegúrate de tener la ruta configurada
    }
  }

