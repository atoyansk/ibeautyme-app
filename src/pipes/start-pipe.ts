import { HomePage } from './../pages/home/home';
import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
  name: 'filter',
  pure: false
})
export class StartPipe implements PipeTransform{
  transform(lists: any[]): any[] {
    if (!lists)
        return lists;
    return lists.filter( l => {
      return (l.distance <= 100);
    });
    
  }
}