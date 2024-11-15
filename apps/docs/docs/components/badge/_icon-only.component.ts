import { BadgeComponent } from 'flowbite-angular/badge';
import { IconComponent } from 'flowbite-angular/icon';

import { Component } from '@angular/core';

@Component({
  selector: 'flowbite-demo-badge-icon-only',
  standalone: true,
  imports: [BadgeComponent, IconComponent],
  templateUrl: './_icon-only.component.html',
  host: {
    class: 'flex flex wrap flex-row gap-3',
  },
})
export class FlowbiteIconOnlyComponent {}