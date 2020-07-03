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



class Main extends Component {
  // constructor(props){
  //   super(props);

  // }

  
  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
}

  render() {
    const HomePage = () => {
      return(
        <Home 
             dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      )
    }
    const DishWithId = ({match}) => {
       return(
         <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
         comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
          />
       )
    }
    return (
      <div>
       <Header />
       <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path = '/menu' component={() => <Menu dishes = {this.props.dishes}/>} />
         <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path="/aboutus" component={() => <About leaders= {this.props.leaders}  />} />
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


const mapStateToProps = (state) => {
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  } 
 }

export default withRouter(connect(mapStateToProps)(Main))