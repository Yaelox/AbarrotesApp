import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  // Obtener datos de un Pokémon por su nombre o ID
  getPokemonData(pokemon: string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${pokemon}`);
  }

  // Obtener la lista de Pokémon con paginación
  getPokemonList(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon?limit=${limit}&offset=${offset}`);
  }
}
