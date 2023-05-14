import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Buffer } from 'buffer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-reset',
    templateUrl: './reset.component.html',
    styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
    token: string | null = '';
    hide: boolean = true;
    isLoading: boolean = false;
    decoded: string = '';
    form!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.form = new FormGroup({
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
            passwordConfirm: new FormControl(null, [
                Validators.required,
                Validators.minLength(8),
            ]),
        });
    }

    resetPassword() {
        this.token = this.route.snapshot.paramMap.get('token');
        const user = Buffer.from(this.token!, 'base64').toString('ascii');

        if (
            this.form.get('password')!.value !==
            this.form.get('passwordConfirm')!.value
        ) {
            return Swal.fire({
                html: `
                    <div style="text-align: center">
                        <b><span style="font-size: 30px">Desculpe!</span></b>
                        <div class="mt-3">
                            <h2>Não foi possível alterar a senha.</h2>
                        </div>
                        <div class="mt-2">
                            <h2>As senhas não coincidem.</h2>
                        </div>
                    </div>
                `,
                icon: 'warning',
                confirmButtonColor: '#1c1c39',
                confirmButtonText: 'Ok',
            });
        }
        this.authService
            .reset(user, this.form.get('password')?.value)
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: `
                <div style="text-align: center">
                    <b><span style="font-size: 30px">Parabéns!</span></b>
                    <div class="mt-3">
                        <h2>A sua senha foi alterada com sucesso.</h2>
                    </div>
                    <div class="mt-2">
                        <h2>Retorne a plataforma e faça o login.</h2>
                    </div>
                </div>
            `,
                    icon: 'success',
                    confirmButtonColor: '#1c1c39',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    this.router.navigateByUrl('login');
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
