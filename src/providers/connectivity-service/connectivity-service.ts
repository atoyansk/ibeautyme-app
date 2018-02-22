import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class ConnectivityServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ConnectivityService Provider');
  }

}