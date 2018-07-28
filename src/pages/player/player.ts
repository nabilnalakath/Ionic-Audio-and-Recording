import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AudioProvider } from 'ionic-audio';

import { ITrackConstraint } from 'ionic-audio';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  myTracks: ITrackConstraint[];
  playlist: ITrackConstraint[] = [];

  currentIndex: number = -1;
  currentTrack: ITrackConstraint;


  constructor(public navCtrl: NavController, public navParams: NavParams, private _audioProvider: AudioProvider,
    private _cdRef: ChangeDetectorRef) 
  {
    this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    },
    {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }];


  }


  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
   
  }

  add(track: ITrackConstraint) {
    this.playlist.push(track);
  }

  play(track: ITrackConstraint, index: number) 
  {
    this.currentTrack = track;
    this.currentIndex = index;
  }

  

  next() {
    // if there is a next track on the list play it
    if (this.playlist.length > 0 && this.currentIndex >= 0 && this.currentIndex < this.playlist.length - 1) {
      let i = this.currentIndex + 1;
      let track = this.playlist[i];
      this.play(track, i);
      this._cdRef.detectChanges();  // needed to ensure UI update
    } else if (this.currentIndex == -1 && this.playlist.length > 0) {
      // if no track is playing then start with the first track on the list
      this.play(this.playlist[0], 0);
    }
  }

  onTrackFinished(track: any) {
    this.next();
  }

  clear() {
    this.playlist = [];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }



}
