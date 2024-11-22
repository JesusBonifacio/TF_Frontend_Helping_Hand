import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Token } from '../../models/token';
import { CampaignService } from '../../services/campaign.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loginForm!: FormGroup;
  hayError: boolean = false;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router, private campaignService: CampaignService, private http: HttpClient) { }

  ngOnInit() {
    this.crearForm();
  }

  crearForm() {
    this.loginForm = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  register() {
    const user = {
      userName: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value,
      enabled: true,
      authorities: "CONSULTA;REGISTRO"
    };
    this.http.post('http://localhost:8080/helpinghands/users/register', user)
      .subscribe({
        next: data => {
          console.log('Registro exitoso:', data);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Error al registrar:', err);
        }
      });
  }

}
