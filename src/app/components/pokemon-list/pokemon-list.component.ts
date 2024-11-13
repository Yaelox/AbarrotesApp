import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = []; // Array para almacenar los Pokémon

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPokemonList(); 
  }

  // Método para manejar el cambio en el estado de favorito
  toggleFavorite(pokemon: any) {
    pokemon.isFavorite = !pokemon.isFavorite; 
    console.log(`${pokemon.name} es ${pokemon.isFavorite ? 'favorito' : 'no favorito'}`);
  }

  // Función para obtener la lista de Pokémon
  fetchPokemonList() {
    const pokemonIds = [10, 2, 300, 54, 500, 100, 7, 432, 865]; 
    pokemonIds.forEach(id => {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .subscribe((pokemon: any) => {
          // Agregar el Pokémon a la lista de pokemons
          this.pokemons.push({
            name: pokemon.name,
            image: pokemon.sprites.front_default, 
            types: pokemon.types.map((type: any) => type.type.name), 
            isFavorite: false 
          });
        });
    });
  }
}
