import React, { Component } from 'react';
import { Modal , ModalBody , ModalHeader, Label,Row , Col,
Card, CardImg, CardBody,Button, CardText, CardTitle , Breadcrumb , BreadcrumbItem} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform , Fade , Stagger} from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class  CommentForm  extends Component {
    constructor(props) {
        super(props);
    this.state = {
          isModalOpen:false
        };
        this.toggleModal = this.toggleModal.bind(this);
      }
      toggleModal(){
        this.setState({
            isModalOpen : !this.state.isModalOpen
        })
    }
    handleSubmit = (values) => {
        this.props.postComment(this.props.dishId , values.rating , values.author , values.comment)
        this.setState({     
        isModalOpen : !this.state.isModalOpen
    })
    }
    render() { 
        return (
            <div>
            <Button outline onClick={this.toggleModal} className="mt-1"> <span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    
                    </ModalBody>
                </Modal>
                </div>
       );
    }
}


function RenderComments(comments , postComment , dishId) {
        if (comments == null) {
            return (<div></div>)
        }

        const comment1 = comments.map(comment => {
            return (
                <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
                </Fade>
            )
        })
        return (
           <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                <Stagger in>
                    {comment1}
                    <CommentForm  dishId={dishId} postComment={postComment}/>
                    </Stagger>
                </ul>

            </div>
        )
    }

    function RenderDish(dish) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                     <FadeTransform in 
               transformProps ={{
                   exitTransform: 'scale(0.5) translateY(-50%)'
               }}>  <Card>
                        <CardImg width="100%" src={baseUrl +dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
      
    const DishdetailComponent = (props) => {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) {
         
        const dishItem =RenderDish(props.dish)
        const commentItem = RenderComments(props.comments , props.postComment ,props.dish.id)
        return (
            <div className="container">
                    <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                {dishItem}
                {commentItem}
            </div>
            </div>
        )
    }
    else
        return(
            <div></div>
        )
    }

    
export default DishdetailComponent
