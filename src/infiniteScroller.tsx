import React, { Component, ReactNode } from 'react';
import { throttle } from 'throttle-debounce';

type Fn = () => any;
interface Props {
    hasMore?: boolean;
    scrollableTarget?: ReactNode;
    next?: Fn;
}

export default class InfiniteScroller extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.throttledOnScrollListener = throttle(150, this.onScrollListener).bind(this)
    }

    private el: HTMLElement | undefined | Window;
    private throttledOnScrollListener : (e: MouseEvent) => void;
    private _scrollableNode: HTMLElement | null | undefined;

    componentDidMount() {
        this._scrollableNode = this.getScrollableNode();
        this.el =  this._scrollableNode || window; // todo: customized scrollable elements
        if(this.el) {
            this.el.addEventListener('scroll', this.throttledOnScrollListener as EventListener)
        }
    }

    getScrollableNode = () => {
        if(this.props.scrollableTarget instanceof HTMLElement) {
            return this.props.scrollableTarget;
        } else if (typeof this.props.scrollableTarget === 'string') {
            return document.getElementById(this.props.scrollableTarget);
        }
        return null;
    }

    isElementAtBottom(
        target: HTMLElement
    ) {
        return (
            (target.scrollHeight - target.clientHeight <= target.scrollTop + 1)
        );
    }

    onScrollListener = (event: MouseEvent) => {
        const target = this._scrollableNode ? (event.target as HTMLElement) 
            : document.documentElement.scrollTop ? 
                document.documentElement
                : document.body;
        const atBottom = this.isElementAtBottom(target);
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