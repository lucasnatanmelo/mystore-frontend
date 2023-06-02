import { Directive, OnInit, Input, ViewContainerRef, TemplateRef } from '@angular/core';

@Directive({
  selector: '[myFor]'
})
export class ForDirective implements OnInit {

  // sync with "let n in [1, 2, 3]"
  @Input("myForIn") numbers: number[] = []

  constructor(private contatiner: ViewContainerRef, private template: TemplateRef<any>) {

  }

  ngOnInit(): void {
    for (let number of this.numbers) {
      this.contatiner.createEmbeddedView(
        this.template,
        { $implicit: number })
    }
  }
}
