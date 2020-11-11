import {
    ElementRef,
    ViewContainerRef,
    TemplateRef,
    Directive,
    Input,
    OnChanges
} from '@angular/core';

@Directive({
    selector: '[bwmHighlight]'
})

export class HighlightDirective {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'transparent';
    }
}

@Directive({
    selector: '[bwmNgIf]'
})

export class BwmNgIfDirective {
    @Input('bwmNgIf')bwmNgIf;
    constructor(private container: ViewContainerRef, private template: TemplateRef<any>) {}
}

@Directive({
    selector: '[bwmNgFor]'
})

export class BwmNgForDirective implements OnChanges {
    @Input('bwmNgForOf') bwmNgForOf: Array<any>;
    constructor(
        private container: ViewContainerRef,
        private template: TemplateRef<any>) {}
    
    ngOnChanges(): any {
        this.bwmNgForOf.forEach(value => {
            this.container.createEmbeddedView(this.template, {$implicit: value});
        });
    }
}
