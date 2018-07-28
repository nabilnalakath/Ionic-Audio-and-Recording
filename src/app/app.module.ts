import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PlayerPage } from '../pages/player/player';
import { ChartpagePage } from '../pages/chartpage/chartpage';


import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';

/**
 * Sample custom factory function to use with ionic-audio
 */
export function myCustomAudioProviderFactory() 
{
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlayerPage,
    ChartpagePage
  ],
  imports: [
    IonicAudioModule.forRoot(defaultAudioProviderFactory), 
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PlayerPage,
    ChartpagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Media,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
