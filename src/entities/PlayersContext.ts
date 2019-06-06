import React from "react";
import {Command} from '../constants';
import {Subject} from 'rxjs/index';

export enum EditorMode {
  TRANSFORM = 'TRANSFORM',
  INSERT = 'INSERT',
  SELECT = 'SELECT',
  VIEW = 'VIEW',
}

export interface IPlayerState {
  id: string;
  name: string;
  color: number;
  editorMode: EditorMode;
  input$: Subject<Command>;
}

export const PlayersContext = React.createContext<IPlayerState[]>([]);
