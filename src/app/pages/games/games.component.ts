import { Component, OnInit, inject } from '@angular/core';
import { GameListComponent } from '../../components/game/game-list/game-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IGame } from '../../interfaces';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../components/modal/modal.component';
import { GameFormComponent } from '../../components/game/game-form/game-form.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    GameListComponent,
    LoaderComponent,
    CommonModule,
    ModalComponent,
    GameFormComponent
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit{
  public gameService: GameService = inject(GameService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService =  inject(AuthService);
  public routeAuthorities: string[] =  [];

  ngOnInit(): void {
    this.gameService.getAll();
    this.route.data.subscribe( data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    });
  }

  handleFormAction(item: IGame) {
    this.gameService.save(item);
  }


}
