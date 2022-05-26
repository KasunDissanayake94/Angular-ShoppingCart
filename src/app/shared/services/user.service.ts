import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import * as moment from "moment";
import {User, UserDetail} from "../models/user";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable()
export class UserService {
  selectedUser: User = new User();
  users: AngularFireList<User>;

  location = {
    lat: null,
    lon: null,
  };

  constructor(private db: AngularFireDatabase, private fbs: AngularFirestore ) {
    this.getUsers();
  }

  getUsers() {
    this.users = this.db.list("test_users");
    return this.users;
  }

  getUserById(id: string) {
    // return this.firestore
    //   .doc("test_users"+ id);

  }

  createUser(data: UserDetail) {
    console.log(data);
    // return this.fbs.collection("test_users").add(JSON.stringify(data));
    return this.fbs.collection("test_users").add({ ...data });
  }

  isAdmin(emailId: string) {
    return this.db.list("clients", (ref) =>
      ref.orderByChild("email").equalTo(emailId)
    );
  }

  updateUser(user: User) {
    this.users.update(user.$key, user);
  }

  setLocation(lat: any, lon: any) {
    this.location = { lat, lon };
  }
}
