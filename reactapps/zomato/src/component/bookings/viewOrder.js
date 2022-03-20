import React,{Component} from 'react';
import axios from 'axios';
import OrderDisplay from './orderDisplay';
import Header from '../../header';

const url = "http://localhost:6700/orders";


class ViewOrder extends Component{
    constructor(props){
        super(props);

        this.state={
            orders:''
        }
    }

    render(){
        if(sessionStorage.getItem('loginStatus') === 'loggedOut'){
            return(
                <>
                    <Header/>
                    <center>
                        <h2>Login First To Check Order</h2>
                    </center>
                </>

            )
        }
        return(
            <>
                <Header/>
                <OrderDisplay orderData={this.state.orders}/>
            </>
        )
    }

    //
    componentDidMount(){
        if(this.props.location){
            let queryp = this.props.location.search;
            if(queryp){
                let data ={
                    "status":queryp.split('&')[0].split('=')[1],
                    "date":queryp.split('&')[2].split('=')[1],
                    "bank_name":queryp.split('&')[3].split('=')[1]
                }
                let id = queryp.split('&')[1].split('=')[1].split('_')[1];
                fetch(`${url}/${id}`,{
                    method:'PATCH',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data)
                })
            }
        }
        let email = sessionStorage.getItem('userInfo').split(',')[1]
        axios.get(`${url}?email=${email}`).then((res) => {this.setState({orders:res.data})})
    }
}

export default ViewOrder;