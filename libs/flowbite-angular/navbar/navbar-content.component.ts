import type { NavbarContentClass, NavbarContentTheme } from './navbar-content.theme';
import { NavbarContentThemeService } from './navbar-content.theme.service';
import { NavbarComponent } from './navbar.component';
import type { NavbarColors } from './navbar.theme';

import type { DeepPartial } from 'flowbite-angular';
import { BaseComponent } from 'flowbite-angular';

import { animate, state, style, transition, trigger } from '@angular/animations';
import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  model,
  ViewEncapsulation,
} from '@angular/core';

export const FLOWBITE_NAVBAR_CONTENT_CUSTOM_STYLE_DEFAULT_VALUE = new InjectionToken<
  DeepPartial<NavbarContentTheme>
>('FLOWBITE_NAVBAR_CONTENT_CUSTOM_STYLE_DEFAULT_VALUE');

export const navbarContentDefaultValueProvider = makeEnvironmentProviders([
  {
    provide: FLOWBITE_NAVBAR_CONTENT_CUSTOM_STYLE_DEFAULT_VALUE,
    useValue: {},
  },
]);

/**
 * @see https://flowbite.com/docs/components/navbar/
 */
@Component({
  standalone: true,
  selector: 'flowbite-navbar-content',
  template: `
    <div [class]="contentClasses().navbarContentListClass">
      <ng-content />
    </div>
  `,
  host: {
    '[@isOpenAnimation]': 'navbarComponent().isOpen()',
  },
  animations: [
    trigger('isOpenAnimation', [
      state('true', style({ height: '*' })),
      state('false', style({ height: '0px' })),
      transition('true <=> false', animate('300ms')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarContentComponent extends BaseComponent<NavbarContentClass> implements OnInit {
  /**
   * Service injected used to generate class
   */
  public readonly themeService = inject(NavbarContentThemeService);
  /**
   * The parent `NavbarComponent`
   */
  public readonly navbarComponent = model(inject(NavbarComponent));

  //#region properties
  /**
   * Set the navbar content color
   *
   * @default `NavbarComponent`'s color
   */
  public color = model<keyof NavbarColors>(this.navbarComponent().color());
  /**
   * Set the custom style for this navbar content
   */
  public customStyle = model(inject(FLOWBITE_NAVBAR_CONTENT_CUSTOM_STYLE_DEFAULT_VALUE));
  //#endregion

  //#region BaseComponent implementation
  public override fetchClass(): NavbarContentClass {
    return this.themeService.getClasses({
      customStyle: this.customStyle(),
    });
  }
  //#endregion
}
