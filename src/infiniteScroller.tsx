import React, { Component, ReactNode } from 'react';
import { throttle } from 'throttle-debounce';

type Fn = () => any;
interface Props {
    hasMore?: boolean;
    onScroll?: (e:MouseEvent) => any;
    scrollableTarget?: ReactNode;
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
    ) {
        return (
            this._scrollableNode && 
            (this._scrollableNode.scrollHeight - this._scrollableNode.clientHeight <= this._scrollableNode.scrollTop + 1)
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