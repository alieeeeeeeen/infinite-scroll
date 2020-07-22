import React, { Component } from 'react';
import { throttle } from 'throttle-debounce';

type Fn = () => any;
interface Props {
    hasMore?: boolean;
    onScroll?: (e:MouseEvent) => any;
    next?: Fn;
    thredshold?: string;
}

export default class InfiniteScroller extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.throttledOnScrollListener = throttle(150, this.onScrollListener).bind(this)
    }

    private el: HTMLElement | undefined | Window;
    private throttledOnScrollListener : (e: MouseEvent) => void;

    componentDidMount() {
        this.el = window; // todo: customized scrollable elements
        if(this.el) {
            this.el.addEventListener('scroll', this.throttledOnScrollListener as EventListener)
        }
    }

    isElementAtBottom(
    ) {
        return (
            (window.innerHeight + window.scrollY) >= document.body.offsetHeight
        );
    }

    onScrollListener = (_: MouseEvent) => {
        const atBottom = this.isElementAtBottom();
        if (atBottom && this.props.hasMore) {
            requestAnimationFrame(() => {
                this.props.next && this.props.next();
            })
          }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}