import { ChangeDetectionStrategy, Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-grand-child',
  standalone: true,
  template: `
    <h3>Title of grand child component</h3>
    {{ cdLog() }}
  `,
})
export class GrandChildComponent {
  /**
   * Indicates that the grandchild component's change detection
   * has been triggered, causing the component to be re-rendered.
   *
   * Note: This is for illustrative purposes only.
   * In real-world templates, pipes should be used instead of methods.
   */
  cdLog() {
    console.log('GRAND CHILD component change detection triggered');
  }
}

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [GrandChildComponent],
  template: `
    <h2>Title of child component</h2>
    {{ cdLog() }}
    <app-grand-child></app-grand-child>
  `,
  /**
   * Disable the OnPush strategy decorator property to verify that on a parent
   * component's button click, all parent, child, and grandchild components are rendered.
   * Enabling the OnPush strategy ensures that only the parent component is re-rendered.
   * Check the console output for more details.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  /**
   * Indicates that the child component's change detection
   * has been triggered, causing the component to be re-rendered.
   *
   * Note: This is for illustrative purposes only.
   * In real-world templates, pipes should be used instead of methods.
   */
  cdLog() {
    console.log('CHILD component change detection triggered');
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <button (click)="click()">Trigger Change Detection by simple click</button>
    {{ cdLog() }}

    <h2>Title of child component</h2>
    <app-child></app-child>
  `,
})
export class App {
  /**
   * Triggers the change detection mechanism in the parent component
   * because NgZone captures events and initiates change detection.
   */
  click() {}

  /**
   * Indicates that the parent component's change detection
   * has been triggered, causing the component to be re-rendered.
   *
   * Note: This is for illustrative purposes only.
   * In real-world templates, pipes should be used instead of methods.
   */
  cdLog() {
    console.log('PARENT component change detection triggered');
  }
}

bootstrapApplication(App);
