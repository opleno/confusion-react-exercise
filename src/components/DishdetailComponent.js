import React, {Component} from "react";
import './DishdetailComponent.css'
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
                        <CardTitle className="m-3">{dish.name}</CardTitle>
                        <CardText className="m-3">{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments (comments) {
        const commentList = comments.map((comment) => {
            return (
                <li>
                    <CardText className='small-text' key={comment.id}>{comment.comment}</CardText>
                    <CardText className='small-medium-text' key={comment.id}>-- {comment.author} , {comment.date}</CardText>
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