import React, { Component } from 'react';
import Header from './HeaderComponent';
import {Switch , Route , Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import DishdetailComponent from './DishdetailComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
class Main extends Component {
  constructor(props){
    super(props);

    this.state={
      dishes : DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    };
  }

  
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
}

  render() {
    const HomePage = () => {
      return(
        <Home 
             dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    const DishWithId = ({match}) => {
       return(
         <DishdetailComponent dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
       )
    }
    return (
      <div>
       <Header />
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path = '/menu' component={() => <Menu dishes = {this.state.dishes}/>} />
         <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path='/contactus' component={Contact} />
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

export default Main;