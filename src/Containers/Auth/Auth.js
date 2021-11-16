import React, {Component} from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from "./Auth.css"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router";

class Auth extends Component {
    state = {
        controls : {
            email: {
                elementType: "input",
                elementConfig: {
                  type: "email",
                  placeholder: "Your Email",
                },
                value: "",
                validation: {
                  required: true,
                },
                valid: false,
                touched: false,
              },
             password: {
                elementType: "input",
                elementConfig: {
                  type: "password",
                  placeholder: "Password",
                },
                value: "",
                validation: {
                  required: true,
                  minLength : 6
                },
                valid: false,
                touched: false,
              }

        },
        isSignUp : true
    }
    checkValidity(value, rules) {
        let isValid = "true";
    
        if (rules.required) {
          isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
          isValid = rules.minLength <= value.length && isValid;
        }
    
        if (rules.maxLength) {
          isValid = rules.maxLength >= value.length && isValid;
        }
    
        return isValid;
      }

      inputChangeHandler =(event, controlName)=>{
          const updatedControls ={
              ...this.state.controls,
              [controlName] : {
                  ...this.state.controls[controlName],
                  value : event.target.value,
                  touched : true,
                  valid : this.checkValidity(event.target.value,this.state.controls[controlName].validation)
              }
          }
          this.setState({controls : updatedControls})
      }
submitHandler = (event)=>{
  event.preventDefault();
  this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)

}

switchAuthHandler =()=> {
  this.setState(prevState=> {
    return {isSignUp : !prevState.isSignUp}
  })
} 
    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({ id: key, config: this.state.controls[key] });
        }
    
let form = formElementsArray.map(formElement=>{
   return  <Input   key = {formElement.id}
             touched={formElement.config.touched}
             invalid={!formElement.config.valid}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              } />
})
if(this.props.loading) {
  form = <Spinner/>
}
let errorMessage = null;
if(this.props.error){
  errorMessage = <p style= {{color : 'red'}}>{this.props.error.message}</p>
}
let authRedirected = null;
if(this.props.isAuthenticated){
  authRedirected= <Redirect to="/"/>
}

        return (
          <div className={classes.Auth}>
            {authRedirected}
{errorMessage}
                <form onSubmit ={this.submitHandler}>
{form}
<Button btnType ='Success'>SUBMIT</Button>
                </form>
                <Button btnType ='Danger'
clicked ={this.switchAuthHandler}
>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : "SIGNUP"}</Button>

          </div>
            

        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth : (email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp))
  }
}

const mapStateToProps = state => {
  return {
    loading : state.auth.loading,
    error : state.auth.error,
    isAuthenticated : state.auth.token !==null
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);