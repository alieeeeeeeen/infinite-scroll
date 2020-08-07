import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

type RouteParams = {
    admin: string
}

interface Props extends RouteComponentProps<RouteParams>, React.Props<RouteParams> {}

const Posts = (props: Props) => {
    console.log(props);

    return(
        <div>posts</div>
    )
}


export default Posts