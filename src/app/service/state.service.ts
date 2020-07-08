import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private pathToMusicfolder:String = ""

  constructor() { }
}

/**
 * Gibt Pfad zum Musikordner zurück
 * @returns Pfad zum Musikordner
 */
function getPathtoMusic() {
  return this.pathToMusicfolder
}

/**
 * Setzt den Pfad zum Musikordner
 * @param path Pfad zum Musikordner
 */
function setPathToMusic(path: String) {
  this.pathToMusicfolder = path
  return true
}

/**
 * Methode zum Lesen der Einstellung aus der Settings.json
 * @returns True, wenn erfolgreich, ansonsten false
 */
function loadSettings() {
  var loadSettings: Boolean = true


  return loadSettings
}

/**
 * Methode zum schreiben der Einstellungen in die Settings.json
 * @returns True, wenn erfolgreich, ansonten false
 */
function writeSettings() {
  var writeSettings: Boolean = true

  return writeSettings
}
