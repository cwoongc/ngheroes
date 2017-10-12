import { Component } from '@angular/core';


//router component인 AppComponent
//routed views ? : router로 생성된 컴포넌트로 인해 전시되는 뷰
@Component({
    selector: 'my-app',
    styleUrls: [ './app.component.css'],
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
        </nav>
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    title = 'Tour of Heroes';
}