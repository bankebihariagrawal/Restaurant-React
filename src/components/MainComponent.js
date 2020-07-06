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
import { addComment, fetchDishes , fetchComments , fetchPromos } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';


class Main extends Component {
  // constructor(props){
  //   super(props);

  // }
  // onDishSelect(dishId) {
  //   this.setState({selectedDish: dishId});
// }

componentDidMount() {
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
}

  render() {
    const HomePage = () => {
      console.log(this.props)
      return(
          <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
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
            addComment={this.props.addComment}
          />
          
      );
    };
    console.log(this.props)
    return (
      <div>
       <Header />
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path = '/menu' component={() => <Menu dishes = {this.props.dishes}/>} />
         <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path="/aboutus" component={() => <About leaders= {this.props.leaders}  />} />
         <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />         
         <Redirect to="/home" />
       </Switch>
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
  addComment:(dishId , rating , author , comment) => dispatch(addComment(dishId , rating , author , comment)),
fetchDishes: () => { dispatch(fetchDishes())},
resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
fetchComments: () => { dispatch(fetchComments())},
fetchPromos: () => { dispatch(fetchPromos())}
  
 })

export default withRouter(connect(mapStateToProps , mapDispatchToProps)(Main))