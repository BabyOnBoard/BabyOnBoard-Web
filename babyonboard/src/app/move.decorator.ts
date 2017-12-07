import {Move} from './move.enum'

export function MoveDecorator(constructor:Function){
  constructor.prototype.Move = Move;
}
