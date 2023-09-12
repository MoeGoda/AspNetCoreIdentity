﻿import { Component, Inject, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../core/state.service';
import { AccountDetailsVM, AuthenticatorDetailsVM, ResultVM, StatusEnum } from '../core/domain';

declare var QRCode: any;

@Component({
    selector: 'setup-authenticator',
    templateUrl: './setup-authenticator.component.html',
    styleUrls: ['./setup-authenticator.component.css']
})
export class SetupAuthenticatorComponent {

    @Input() accountDetails: AccountDetailsVM;

    public authenticatorDetails: AuthenticatorDetailsVM = <AuthenticatorDetailsVM>{};
    public displayAuthenticator: boolean = false;
    public generatingQrCode: boolean = false;
    public verificationCode: string = '';
    public errors: string = '';
    public recoveryCodes: string[] = [];
    public authenticatorNeedsSetup: boolean = false;
    public validVerificationCodes: number[] = [];
    public pollForValidVerificationCodes: any = null;
    public displayValidVerificationCodes: boolean = false;

    public generatedQRCode: any;

    constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
        public stateService: StateService, private router: Router) {
        router.events.subscribe((val) => {
            // see also
            if (val instanceof NavigationEnd) {
                if (val.url !== "/manage/account") {
                    if (this.pollForValidVerificationCodes != null) {
                        clearInterval(this.pollForValidVerificationCodes);
                        this.pollForValidVerificationCodes = null;
                    }
                }
            }
        });
    }

    setupAuthenticator() {
        let self = this;

        self.recoveryCodes = [];

        this.http.get<AuthenticatorDetailsVM>(this.baseUrl + 'api/twoFactorAuthentication/setupAuthenticator').subscribe(result => {
            this.authenticatorDetails = result;
            console.log(this.authenticatorDetails);
            this.displayAuthenticator = true;
            this.generatingQrCode = true;

            setTimeout(function () {
                self.generatedQRCode = new QRCode(document.getElementById("genQrCode"),
                    {
                        text: self.authenticatorDetails.authenticatorUri,
                        width: 150,
                        height: 150,
                        colorDark: "#000",
                        colorLight: "#ffffff",
                        correctLevel: QRCode.CorrectLevel.H
                    });
                self.generatingQrCode = false;
                (document.querySelector("#genQrCode > img") as HTMLInputElement).style.margin = "0 auto";
            },
                200);

        }, error => console.error(error));
    }

    toggleValidVerificationCodes(event: any) {
        let self = this;
        self.displayValidVerificationCodes = event;
        if (event) {
            self.getValidVerificationCodes();

            self.pollForValidVerificationCodes = setInterval(function () {
                self.getValidVerificationCodes();
            },
                10000);
        } else {
            this.clearValidVerificationCodes();
        }
    }

    getValidVerificationCodes() {
        this.http.get<number[]>(this.baseUrl + 'api/twoFactorAuthentication/validAutheticatorCodes').subscribe(
            result => {
                this.validVerificationCodes = result;
            });
    }

    clearValidVerificationCodes() {
        this.displayValidVerificationCodes = false;
        this.validVerificationCodes = [];

        if (this.pollForValidVerificationCodes != null) {
            clearInterval(this.pollForValidVerificationCodes);
            this.pollForValidVerificationCodes = null;
        }
    }

    verifyAuthenticator() {
        var verification = {
            verificationCode: this.verificationCode.toString()
        };

        this.errors = '';

        this.http.post<ResultVM>(this.baseUrl + 'api/twoFactorAuthentication/verifyAuthenticator', verification).subscribe(result => {

            let verifyAuthenticatorResult = result;
            if (verifyAuthenticatorResult.status === StatusEnum.Success) {
                this.stateService.displayNotification({ message: verifyAuthenticatorResult.message, type: "success" });

                if (verifyAuthenticatorResult.data && verifyAuthenticatorResult.data.recoveryCodes) {
                    // display new recovery codes
                    this.recoveryCodes = verifyAuthenticatorResult.data.recoveryCodes;
                }

                this.displayAuthenticator = false;
                this.generatingQrCode = false;
                this.accountDetails.hasAuthenticator = true;
                this.accountDetails.twoFactorEnabled = true;
                this.clearValidVerificationCodes();
            } else if (verifyAuthenticatorResult.status === StatusEnum.Error) {
                this.errors = verifyAuthenticatorResult.data.toString();
            }
        },
            error => console.error(error));
    }

    onKeydown(event: any) {
        if (event.key === "Enter") {
            this.verifyAuthenticator();
        }
    }

    disable2FA() {
        this.http.post<ResultVM>(this.baseUrl + 'api/twoFactorAuthentication/disable2FA', {}).subscribe(result => {

            let disable2FAResult = result;

            if (disable2FAResult.status === StatusEnum.Success) {
                this.stateService.displayNotification({ message: disable2FAResult.message, type: "success" });
                this.accountDetails.twoFactorEnabled = false;
                this.recoveryCodes = [];
            } else {
                this.stateService.displayNotification({ message: disable2FAResult.message, type: "danger" });
            }
        },
            error => console.error(error));
    }

    resetRecoverCodes() {
        this.http.post<ResultVM>(this.baseUrl + 'api/twoFactorAuthentication/generateRecoveryCodes', {}).subscribe(result => {

            let generateRecoverCodesResult = result;

            if (generateRecoverCodesResult.status === StatusEnum.Success) {
                this.stateService.displayNotification({ message: generateRecoverCodesResult.message, type: "success" });

                if (generateRecoverCodesResult.data && generateRecoverCodesResult.data.recoveryCodes) {
                    // display new recovery codes
                    this.recoveryCodes = generateRecoverCodesResult.data.recoveryCodes;
                }
            } else {
                this.stateService.displayNotification({ message: generateRecoverCodesResult.message, type: "danger" });
            }
        },
            error => console.error(error));
    }
}
