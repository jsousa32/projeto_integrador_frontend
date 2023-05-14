import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Buffer } from 'buffer';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-forgot',
    templateUrl: './forgot.component.html',
    styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
    token: string | null = '';
    selected = 'user';
    isLoading: boolean = false;
    hide = true;
    form!: FormGroup;

    constructor(
        private router: Router,
        private service: AuthService,
        public session: StorageService
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.form = new FormGroup({
            susNumber: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });
    }

    recoveryPassword() {
        this.isLoading = true;
        if (this.selected === 'user') this.form.removeControl('susNumber');
        if (this.selected === 'patient') this.form.removeControl('email');

        this.service
            .forgot(
                this.form.get('susNumber')?.value ||
                    this.form.get('email')?.value
            )
            .toPromise()
            .then(() => {
                Swal.fire({
                    html: `
                <div style="text-align: center">
                    <b><span style="font-size: 30px">Parabéns!</span></b>
                    <div class="mt-3">
                        <h2>E-mail enviado com sucesso.</h2>
                    </div>
                    <div class="mt-2">
                        <h2>Para recuperar a senha acesse seu e-mail.</h2>
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
            .catch(() => {
                Swal.fire({
                    html: `
                  <div style="text-align: center">
                      <b><span style="font-size: 30px">Desculpe!</span></b>
                      <div class="mt-3">
                          <h2>Não foi possível recuperar a senha.</h2>
                      </div>
                      <div class="mt-2">
                          <h2>E-mail, por favor tente novamente.</h2>
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
