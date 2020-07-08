import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import DishdetailComponent from './DishdetailComponent';
import Menu from './MenuComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Switch , Route , Redirect , withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { postComment, fetchDishes , fetchComments , fetchPromos , fetchLeaders, postFeedback } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import {TransitionGroup , CSSTransition} from 'react-transition-group'


class Main extends Component {
  // constructor(props){
  //   super(props);

  // }
  // onDishSelect(dishId) {
  //   this.setState({selectedDish: dishId});
// }

componentDidMount() {
  this.props.fetchPromos(); 
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchLeaders();
}
  render() {
    const HomePage = () => {
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersloading = {this.props.leaders.isLoading}
              leadersError = {this.props.leaders.errMess}
              />
      );
    }
    const DishWithId = ({match}) => {
      return(
        <DishdetailComponent dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
          
      );
    };
    return (
      <div>
       <Header />
       <TransitionGroup>
       <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path = '/menu' component={() => <Menu dishes = {this.props.dishes}/>} />
         <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path="/aboutus" component={() => <About leaders= {this.props.leaders}  />} />
         <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />         
         <Redirect to="/home" />
       </Switch>
       </CSSTransition>
       </TransitionGroup>

        {/* <Menu dishes={this.state.dishes} 
            onClick={(dishId) => this.onDishSelect(dishId)} />  
        <DishdetailComponent 
        dish={this.state.dishes.filter((dish) =>
        dish.id === this.state.selectedDish )[0]} /> 
        */}
        <Footer /> 
        </div>
    );
  }
}


const mapStateToProps = (state) => {
  
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  } 
}
 const mapDispatchToProps = (dispatch) => ({
  postComment:(dishId , rating , author , comment) => dispatch(postComment(dishId , rating , author , comment)),
fetchDishes: () => { dispatch(fetchDishes())},
resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
fetchComments: () => { dispatch(fetchComments())},
fetchPromos: () => { dispatch(fetchPromos())},
fetchLeaders:() => {dispatch(fetchLeaders())}  ,
postFeedback :(firstname , lastname , number , email , agree , type , feedback) => dispatch(postFeedback(firstname , lastname , number , email , agree , type , feedback))
 })

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Main))