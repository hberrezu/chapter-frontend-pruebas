import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Character } from 'src/app/interfaces/character';
import { CharactersService } from './../../services/characters.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public characters: Character[] = [];
  public charactersFiltering: Character[] =[];
  public selectedCharacter: any = null;
  form: FormGroup;  

  constructor(private _characterService: CharactersService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCharacters();
  }

  public getCharacters(){
    this._characterService.getCharacters().subscribe(data => {
      this.characters = data;
      this.charactersFiltering = data;
    })
  }

  public getCharacterByTitle(title:string){
    this._characterService.getCharacterByTitle(title).subscribe(data => {
      this.selectedCharacter = data[0];
    })
  }

  public deleteCharacterById(id:number){
    this._characterService.deleteCharacter(id);
    setTimeout(() => {
      this.getCharacters();
    }, 500)
  }

  public addCharacter(){
    const character: Character = {
      title: this.form.value.name,
      body: this.form.value.description,
      image: this.form.value.image,
      category: "main",
    }

    this._characterService.addCharacter(character).subscribe(data=> {
      this.getCharacters();
      return data;
    })
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.charactersFiltering = this.characters.filter(word => {
      return word.title.trim().toLowerCase().includes(filterValue.trim().toLowerCase());
    });
  }

}
