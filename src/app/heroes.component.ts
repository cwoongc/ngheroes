import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';


@Component({
  selector: 'my-heroes',
  styleUrls: ['./heroes.component.css'],
  templateUrl: './heroes.component.html',
  // providers: [ HeroService ]
})
export class HeroesComponent implements OnInit {

  ngOnInit(): void {
    this.getHeroes();
  }

  constructor(
    private heroService: HeroService,
    private router: Router
  ){}

  getHeroes() {
    this.heroService.getHeroes().then( heroes =>
      this.heroes = heroes
    );
  }

  
  //클래스 속성에 object 바로 할당시엔 type정의를 생략가능. 바로 name을 쓰고 '=' 로 object할당하면 알아서 type을 체킹한다(primitive type경우)
  //class object --one way binding--> template은 template에서 {{속성명}} 문법으로 사용한다.
  
  //클래스 속성에 타입을 명시적으로 선언할때는 name: type 형식으로 선언하고, 그이후 '='로 object를 할당한다.  
  hero: Hero  = {
    id: 1,
    name: 'Windstorm'
  }

  selectedHero: Hero;
  heroes: Hero[];

  

  onSelect(hero: Hero): void {
  
    this.selectedHero = hero;

    //NgClass 속성 디렉티브로 CSS를 enable/disable
    // this.isBadge = !this.isBadge;
    this.setCurrentClasses();

  }

  //빌트인 attribute directive NgClass를 이용하여 CSS적용을 enable/disable 시킨다
  isBadge:boolean = false;

  currentClasses:{};

  setCurrentClasses():void {
    this.currentClasses = {
      'badge': !this.isBadge
    }
    this.isBadge = !this.isBadge
  }

  trackByHeros(index: number, hero: Hero) {
    return hero.id;
  }


  gotoDetail():void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.heroService.create(name)
      .then(hero=> {
          this.heroes.push(hero);
          this.selectedHero = null;
      });
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(()=>{
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }

















}
