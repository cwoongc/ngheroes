"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var hero_service_1 = require("./hero.service");
var HeroesComponent = (function () {
    function HeroesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
        //클래스 속성에 object 바로 할당시엔 type정의를 생략가능. 바로 name을 쓰고 '=' 로 object할당하면 알아서 type을 체킹한다(primitive type경우)
        //class object --one way binding--> template은 template에서 {{속성명}} 문법으로 사용한다.
        //클래스 속성에 타입을 명시적으로 선언할때는 name: type 형식으로 선언하고, 그이후 '='로 object를 할당한다.  
        this.hero = {
            id: 1,
            name: 'Windstorm'
        };
        //빌트인 attribute directive NgClass를 이용하여 CSS적용을 enable/disable 시킨다
        this.isBadge = false;
    }
    HeroesComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    HeroesComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes().then(function (heroes) {
            return _this.heroes = heroes;
        });
    };
    HeroesComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
        //NgClass 속성 디렉티브로 CSS를 enable/disable
        // this.isBadge = !this.isBadge;
        this.setCurrentClasses();
    };
    HeroesComponent.prototype.setCurrentClasses = function () {
        this.currentClasses = {
            'badge': !this.isBadge
        };
        this.isBadge = !this.isBadge;
    };
    HeroesComponent.prototype.trackByHeros = function (index, hero) {
        return hero.id;
    };
    HeroesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedHero.id]);
    };
    HeroesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroesComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        });
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    core_1.Component({
        selector: 'my-heroes',
        styleUrls: ['./heroes.component.css'],
        templateUrl: './heroes.component.html',
    }),
    __metadata("design:paramtypes", [hero_service_1.HeroService,
        router_1.Router])
], HeroesComponent);
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map