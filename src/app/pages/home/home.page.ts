import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service'; // Importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemonDelDia: any = null; // Variable para almacenar el Pokémon del día
  habilidades: string[] = []; // Lista de habilidades
  fortalezas: string[] = []; // Lista de fortalezas
  evoluciones: string[] = []; // Lista de evoluciones

  constructor(private PokeapiService: PokeapiService) {}

  ngOnInit() {
    this.obtenerPokemonDelDia();
  }

  verDetalles() {
    console.log('Detalles del Pokémon:', this.pokemonDelDia);
    // Lógica adicional, como navegación a una página de detalles
  }

  obtenerPokemonDelDia() {
    this.PokeapiService.getPokemonOfTheDay().subscribe(
      (data) => {
        this.pokemonDelDia = data; // Guardar el Pokémon del día en la variable
        console.log('Pokémon del día:', this.pokemonDelDia); // Ver en consola
        this.obtenerHabilidades();
        this.obtenerFortalezas();
        this.obtenerEvoluciones();
      },
      (error) => {
        console.error('Error al obtener el Pokémon del día:', error);
      }
    );
  }

  obtenerHabilidades() {
    this.habilidades = this.pokemonDelDia.abilities.map(
      (ability: any) => ability.ability.name
    );
    console.log('Habilidades:', this.habilidades);
  }

  obtenerFortalezas() {
    this.PokeapiService.getPokemonTypeStrengths(this.pokemonDelDia.types).subscribe(
      (data: any) => {
        this.fortalezas = data.strengths;
        console.log('Fortalezas:', this.fortalezas);
      },
      (error) => {
        console.error('Error al obtener fortalezas:', error);
      }
    );
  }

  obtenerEvoluciones() {
    this.PokeapiService.getPokemonEvolutionChain(this.pokemonDelDia.species.url).subscribe(
      (data: any) => {
        this.evoluciones = data.evolutions;
        console.log('Evoluciones:', this.evoluciones);
      },
      (error) => {
        console.error('Error al obtener evoluciones:', error);
      }
    );
  }
}
