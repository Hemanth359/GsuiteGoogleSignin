import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { GoogleLoginProvider, SocialAuthService } from 'lib';
import {
  GoogleLoginProvider,
  SocialUser,
 // FacebookLoginProvider,
  SocialAuthService
} from '@abacritt/angularx-social-login';
//import { SocialUser } from '../../../projects/lib/src/providers/facebook-login-provider';
import { FacebookLoginProvider } from '../../../projects/lib/src/providers/facebook-login-provider';
import { MicrosoftLoginProvider } from '../../../projects/lib/src/providers/microsoft-login-provider';
import { AlertService, AuthenticationService, UserService } from '../_services';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
// import {
//  // FacebookLoginProvider,
//  // AmazonLoginProvider,
//   VKLoginProvider,
//   MicrosoftLoginProvider,
// } from 'lib';

@Component({
  selector: 'lib-app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  user: SocialUser | undefined;
  GoogleLoginProvider = GoogleLoginProvider;
  returnUrl: string;

  private currentUserSubject: BehaviorSubject<any>;
	public currentUser: Observable<any>;

  userList
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService,private readonly _authService: SocialAuthService, private route: ActivatedRoute,private router: Router, private userService: UserService) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();

    }

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      this.router.navigate([this.returnUrl]);
      console.log("111")
     console.log(user)
      if(user){
        const currentItems = {
          firstName: user.firstName,
          lastName: user.lastName,
          username:user.name,
          password:user.id,
          idToken:user.idToken
        };
        // console.log("done adding1111111111111")
        // this.userService.getuserByuserName(currentItems.username).pipe(first()).subscribe(users => {
        //   this.userList = users;
        // });
        // console.log("userlist!!!!!!!!!!!")
        // console.log(this.userList)
        // if(this.userList){


        //   this.authenticationService.login(currentItems.username, currentItems.password)
        //       .pipe(first())
        //       .subscribe(
        //         data => {
        //           console.log("return URL")
        //           console.log(this.returnUrl)
        //           //this.router.navigate([this.returnUrl]);
        //           this.router.navigate(["/home"]);
        //         },
        //         error => {
        //           this.alertService.error(error);
        //          // this.loading = false;
        //         });

        // }
        // else{




        this.userService.register(currentItems)
        .pipe(first())
        .subscribe(
            data => {

console.log("in register success!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

              this.authenticationService.googleUserLogin(currentItems.idToken,'222456991365-f3ltlkb9utlauipdaq0shode452uh39i.apps.googleusercontent.com' )
              .pipe(first())
              .subscribe(
                data => {
                  this.alertService.success('Registration successful', true);
                  //this.router.navigate([this.returnUrl]);
                  this.router.navigate(["/home"]);
                },
                error => {
                  this.alertService.error(error);
                 // this.loading = false;
                });


              // this.authenticationService.login(currentItems.username, currentItems.password)
              // .pipe(first())
              // .subscribe(
              //   data => {
              //     this.alertService.success('Registration successful', true);
              //     //this.router.navigate([this.returnUrl]);
              //     this.router.navigate(["/home"]);
              //   },
              //   error => {
              //     this.alertService.error(error);
              //    // this.loading = false;
              //   });







          //     console.log("done adding")
          //     currentItems['token']=user.idToken
          //     localStorage.setItem('currentUser', JSON.stringify(currentItems));
          //     this.currentUserSubject.next(currentItems);
					// // this.currentUserSubject.next(user);
          // console.log("set user subject!!!!!!!!")


          //       this.alertService.success('Registration successful', true);
          //       this.router.navigate(['/home']);
            },
            error => {

              console.log("in register error !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
             // console.log(error)
             // console.log("done addingerrors")
                //this.alertService.error(error);
                //this.loading = false;





                this.authenticationService.googleUserLogin(currentItems.idToken,'222456991365-f3ltlkb9utlauipdaq0shode452uh39i.apps.googleusercontent.com' )
                .pipe(first())
                .subscribe(
                  data => {
                    //this.alertService.success('Registration successful', true);
                    //this.router.navigate([this.returnUrl]);
                    this.router.navigate(["/home"]);
                  },
                  error => {
                    this.alertService.error(error);
                   // this.loading = false;
                  });




                // this.authenticationService.login(currentItems.username, currentItems.password)
                // .pipe(first())
                // .subscribe(
                //   data => {
                //     //this.router.navigate([this.returnUrl]);
                //     this.router.navigate(["/home"]);
                //   },
                //   error => {
                //     this.alertService.error(error);
                //    // this.loading = false;
                //   });



            });


        //     currentItems['token']=user.idToken
        //     localStorage.setItem('currentUser', JSON.stringify(currentItems));
        //     this.currentUserSubject.next(currentItems);
        //     console.log(currentItems)
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // this.router.navigate(["/home"]);
     // }
    }
    });
    		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public get currentUserValue(): any {
		return this.currentUserSubject.value;
	}

  signInWithFB(): void {
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  // signInWithAmazon(): void {
  //   this._authService.signIn(AmazonLoginProvider.PROVIDER_ID);
  // }

  // signInWithVK(): void {
  //   this._authService.signIn(VKLoginProvider.PROVIDER_ID);
  // }

  signInWithMicrosoft(): void {
    this._authService.signIn(MicrosoftLoginProvider.PROVIDER_ID);
  }
  

  signOut(): void {
    this._authService.signOut();
  }

  refreshGoogleToken(): void {
    this._authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    
  }
}
