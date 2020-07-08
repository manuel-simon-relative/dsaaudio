import { Injectable } from '@angular/core';
import { db } from '../service/db.service'

@Injectable({
  providedIn: 'root'
})
export class DbcontrolService {

  constructor() { }
}

/**
 * Lädt Inhalt der db.json in die globale Variable db
 * @param path - Pfad zur Datei
 * @returns true, wenn erfolgreich, sonst false
 */
function connect(path:String) {
  var noError: Boolean = true


  return noError
}

/**
 * Speichert Inhalt der db in db.json
 * @param path - Pfad zur Datei
 */
function writeToDb(path:String) {
  var noError: Boolean = true

  return noError
}
