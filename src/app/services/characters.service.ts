import { Character } from './../interfaces/character';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private http: HttpClient) {}
  
  getCharacters(): Observable<Character[]>{
    return this.http.get<Character[]>('https://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=35');
  }

  getCharacterByTitle(title:string):Observable<Character[]>{
    return this.http.get<Character[]>('https://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=35&title='+title);
  }

  deleteCharacter(characterId:number){
    return this.http.delete('https://bp-marvel-api.herokuapp.com/marvel-characters/'+characterId+'?idAuthor=35')
        .subscribe(() => 'Delete successful');
  }

  addCharacter(character: Character){
    return this.http.post<Character>('https://bp-marvel-api.herokuapp.com/marvel-characters?idAuthor=35', character);
  }

}
