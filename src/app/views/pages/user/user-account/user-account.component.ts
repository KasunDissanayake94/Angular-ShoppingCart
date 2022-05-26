import { Component, OnInit, AfterViewInit } from "@angular/core";
import {User, UserDetail} from "src/app/shared/models/user";
import {AuthService} from "../../../../shared/services/auth.service";
import {UserService} from "../../../../shared/services/user.service";
import {auth} from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs";
import * as firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {reduce} from "rxjs/operators";
// import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.scss"],
})
export class UserAccountComponent implements AfterViewInit {
  userData = new UserDetail();
  currentUserId: string;

  constructor(private firebaseAuth: AngularFireAuth,
              private userService: UserService,
              private dbRef: AngularFirestore) {
    this.firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.currentUserId = user.uid;
        console.log(this.currentUserId);
        this.dbRef.collection("test_users", ref => ref.where("$key", "==", this.currentUserId))
          .get().subscribe(snap => {
          snap.forEach(doc => {
            this.userData.firstName = doc.data().firstName;
            this.userData.lastName = doc.data().lastName;
            this.userData.emailId = doc.data().emailId;
            this.userData.phoneNumber = doc.data().phoneNumber;
          });

        });
      } else {
        this.currentUserId = user.uid;
      }
    });


  }

  ngAfterViewInit(): void {}
}
