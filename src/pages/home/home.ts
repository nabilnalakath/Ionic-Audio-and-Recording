import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];
  newaudioList: any[]=[];


  constructor(public navCtrl: NavController,
    private media: Media,
    private file: File, public platform: Platform) 
    {
   
  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  getAudioList() 
  {
    if (localStorage.getItem("audiolist")) 
    {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log(this.audioList);
      this.newaudioList=[]; 
    }
  }

  getplayingAudioList(idx) 
  {
    if (localStorage.getItem("audiolist")) {
      this.audioList = JSON.parse(localStorage.getItem("audiolist"));
      console.log('audio list:');
      this.newaudioList[0] = this.audioList[idx];
      console.log(this.newaudioList);
    }
  }

  startRecord(filename) 
  {
    if (this.platform.is('ios')) {
      //this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.fileName = filename + '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
     // this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
      this.fileName = filename + '.3gp';
     this.filePath = '/storage/emulated/0/Fitzapp/' + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }


  playAudio(file, idx) {
    if (this.platform.is('ios')) 
    {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      console.log(this.filePath);
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) 
    {
      this.filePath = '/storage/emulated/0/Fitzapp/' + file;
      console.log(this.filePath);
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
    this.getplayingAudioList(idx);
  }

}
