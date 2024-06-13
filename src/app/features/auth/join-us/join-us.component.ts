import { Component } from '@angular/core';
import { TextComponent } from '../../shared/components/text/text.component';
import { JoinUsBoxComponent } from './components/join-us-box/join-us-box.component';


@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [TextComponent, JoinUsBoxComponent],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss',
})
export class JoinUsComponent {}
