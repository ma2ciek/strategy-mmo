import _World from './World';
import _Circle from './shapes/Circle';
import _Rectangle from './shapes/Rectangle';
import _Image from './shapes/Image';
import _Cell from './shapes/Cell';
import { circleMask as _circleMask } from './shapes/mask';

export class World extends _World { };
export class Circle extends _Circle {};
export class Rectangle extends _Rectangle {};
export class Image extends _Image {};
export class Cell extends _Cell {};
export const circleMask = _circleMask;
