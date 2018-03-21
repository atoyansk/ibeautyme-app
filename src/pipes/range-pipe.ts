import { HomePage } from './../pages/home/home';
import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'filterDistance',
  pure: false
})
export class RangePipe implements PipeTransform{
  transform(lists: any[], distancia: number): any[] {
    if (!distancia)
        return lists;
    return lists.filter( l => {
      return (l.distance <= distancia);
    });
    
  }
}