import React, { Component } from 'react';
import Header from './HeaderComponent';
import {Switch , Route , Redirect} from 'react-router-dom';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
// import DishdetailComponent from './DishdetailComponent'
import Footer from './FooterComponent';;

class Main extends Component {
  constructor(props){
    super(props);

    this.state={
      dishes : DISHES,
      selectedDish:null
    }
  }

  
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
}

  render() {
    const HomePage = () => {
      return(
        <Home />
      )
    }
    return (
      <div>
       <Header />
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path = '/menu' component={() => <Menu dishes = {this.state.dishes}/>} />
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