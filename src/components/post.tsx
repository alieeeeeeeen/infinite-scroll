import React from 'react';
import { RouteComponentProps, Redirect} from 'react-router-dom';

type RouteParams = {
    admin: string
}

interface Props extends RouteComponentProps<RouteParams>, React.Props<RouteParams> {}


const Posts = (props: Props) => {
    return(
        <div>title</div>
    )
}


export default Posts