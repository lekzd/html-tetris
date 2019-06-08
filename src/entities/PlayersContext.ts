import React from "react";
import {Command} from '../constants';
import {Subject} from 'rxjs/index';

export enum EditorMode {
  NORMAL = 'NORMAL',
  INSERT = 'INSERT',
  VISUAL = 'VISUAL',
}

export interface IPlayerState {
  id: string;
  name: string;
  color: number;
  editorMode: EditorMode;
  input$: Subject<Command>;
}

export const PlayersContext = React.createContext<IPlayerState[]>([]);
