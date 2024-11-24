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

  // Método para obtener el Pokémon del día
  getPokemonOfTheDay(): Observable<any> {
    const date = new Date();
    const dayOfYear = this.getDayOfYear(date);
    const pokemonId = (dayOfYear % 898) + 1;  // PokeAPI tiene 898 Pokémon, así que usamos el módulo para evitar que se salga del rango
    return this.http.get(`${this.baseUrl}pokemon/${pokemonId}`);  // Cambié apiUrl por baseUrl
  }

  // Método auxiliar para obtener el día del año
  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
}
