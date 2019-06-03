import {ChooseRoom} from "./rooms/ChooseRoom";
import {NewGameRoom} from "./rooms/NewGameRoom";
import {IStyle} from "./entities/StyleContext";
import {BehaviorSubject} from "rxjs";
import {JoinRoom} from "./rooms/JoinRoom";

export type JoinRoomRoute = [
  typeof JoinRoom,
  {}
]

export type ChooseRoomRoute = [
  typeof ChooseRoom,
  {
    name: string;
  }
]

export type GameRoomRoute = [
  typeof NewGameRoom,
  {
    style: IStyle;
    spaces: number;
  }
]

type routes = JoinRoomRoute | ChooseRoomRoute | GameRoomRoute;

export const router$ = new BehaviorSubject<routes>([JoinRoom, {}]);

/*
* Usage:
*
* In main component:
* <div>
*   {React.createElement(...router$.value)}
* </div>
*
* Redirect:
* router$.next([Component, {...props}])
*
* Fetching route params:
* const {param1, param2} = router$.value[1]
*
* */
