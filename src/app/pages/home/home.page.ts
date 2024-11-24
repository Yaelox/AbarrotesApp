import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';  // Importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemonDelDia: any = null;  // Variable para almacenar el Pokémon del día

  constructor(private PokeapiService: PokeapiService) {}

  ngOnInit() {
    this.obtenerPokemonDelDia();
  }

  obtenerPokemonDelDia() {
    this.PokeapiService.getPokemonOfTheDay().subscribe(
      (data) => {
        this.pokemonDelDia = data;  // Guardar el Pokémon del día en la variable
        console.log('Pokémon del día:', this.pokemonDelDia);  // Ver en consola
      },
      (error) => {
        console.error('Error al obtener el Pokémon del día:', error);
      }
    );
  }
}
