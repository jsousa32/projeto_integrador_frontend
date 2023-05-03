import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    selected = 'user';
    isLoading: boolean = false;
    constructor(
        private router: Router,
        private service: AuthService,
        public session: StorageService
    ) {}

    hide = true;
    form!: FormGroup;

    ngOnInit(): void {
        this.form = new FormGroup({
            susNumber: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    login() {
        this.isLoading = true;
        if (this.selected === 'user') this.form.removeControl('susNumber');
        if (this.selected === 'patient') this.form.removeControl('email');

        this.service
            .login(
                this.form.get('susNumber')?.value ||
                    this.form.get('email')?.value,
                this.form.get('password')?.value
            )
            .toPromise()
            .then((result) => {
                this.session.setStorage('user', result!);
                this.router.navigateByUrl('home');
            })
            .catch(() => {
                Swal.fire({
                    html: `
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não foi possível fazer o login!</h2>
                        </div>
                        <div class="mt-2">
                            <h2>Usuário ou senha inválidos, por favor tente novamente.</h2>
                        </div>
                    </div>
                `,
                    icon: 'warning',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                });
                this.isLoading = false;
            });
    }
}
