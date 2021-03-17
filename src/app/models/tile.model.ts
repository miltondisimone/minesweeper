export interface ITile {
  row: number;
  column: number;
  hasMine: boolean;
  hasFlag: boolean;
  isDiscovered: boolean;
  minesAround: number;
  minesAroundCovered: number
}
