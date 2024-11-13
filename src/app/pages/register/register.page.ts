import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string='';
  password: string='';
  Name: string='';

  constructor(private authService: AuthService) {}

  // Lógica para registrar al usuario
  async onRegister() {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email || !emailPattern.test(this.email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (this.password !== this.password) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.Name);
      alert('Registro exitoso');
    } catch (error:any) {
      alert('Error al registrarse: ' + error.message);
    }
  }
}
