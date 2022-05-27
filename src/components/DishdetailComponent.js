import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderDish (dish) {
        if (dish != null)
            return(
                <Card key={dish.id} >
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments (comments) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        const commentList = comments.map((comment) => {
            let datetime = new Date(Date.parse(comment.date));
            // TODO check why it shows one day off. I am in GMT-4, maybe this could be a reason
            let date = `${monthNames[datetime.getUTCMonth()]} ${datetime.getUTCDate()}, ${datetime.getUTCFullYear()}`;
            return (
                <li>
                    <CardText key={comment.id}>{comment.comment}</CardText>
                    <CardText key={comment.id}>-- {comment.author} , {date}</CardText>
                    <p></p>
                </li>
            );
        });

        return (
            <div className="list-unstyled">
                <h4>Comments</h4>
                {commentList}
            </div>
        )
    }

    render () {
        return (
            <div className="container">
                <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
                </div>
            </div>
          );
    }
}

export default DishDetail;