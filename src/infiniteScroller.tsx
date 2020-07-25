import React, { Component, ReactNode } from 'react';
import { throttle } from 'throttle-debounce';

type Fn = () => any;
interface Props {
    hasMore: boolean;
    scrollableTarget?: ReactNode;
    next?: Fn;
    loader?: ReactNode;
    dataLength: number;
}

interface State {
    showLoader: boolean;
}

export default class InfiniteScroller extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showLoader: false,
        }
        this.throttledOnScrollListener = throttle(150, this.onScrollListener).bind(this)
    }


    private el: HTMLElement | undefined | Window;
    private throttledOnScrollListener : (e: MouseEvent) => void;
    private _scrollableNode: HTMLElement | null | undefined;

    componentDidMount() {
        if (typeof this.props.dataLength === 'undefined') {
            throw new Error(
              `mandatory prop "dataLength" is missing. The prop is needed.`
            );
        }
        this._scrollableNode = this.getScrollableNode();
        this.el =  this._scrollableNode || window; // todo: customized scrollable elements
        if(this.el && this.props.hasMore) {
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
            this.setState({showLoader: true});
            requestAnimationFrame(() => {
                this.props.next && this.props.next();
            })
          }
    }

    UNSAFE_componentWillReceiveProps(props: Props) {
        if(this.props.dataLength === props.dataLength) {
            return;
        }
        this.setState({
            showLoader: false
        })
    }

    render() {
        return (
            <div>
                {this.props.children}
                {this.state.showLoader && this.props.loader}
            </div>
        )
    }
}