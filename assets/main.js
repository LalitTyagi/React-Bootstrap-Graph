import React from 'react';
import ReactDOM from 'react-dom';
import {csv} from 'd3-request';
import {Bootstrap, Grid, Row, Col, Clearfix, NavItem, Table, FormControl, FormGroup} from 'react-bootstrap';
import {Navbar, Nav, Button} from 'react-bootstrap';
var $ = require('jquery');




var Main = React.createClass({

	getInitialState:function()
	{
		return{
			dataXNSE:[],
			searchResults:'',
			open:0,
			high:0,
			low:0,
			close:0,
			volume:0,
			searchData:[],
			searchDataPrice:[]
		}
	},

	componentWillMount:function()
	{
		console.log("componentWillMount")
		csv('../XNSE-datasets-codes.csv', (dataXNSE) => {
      		this.setState({
        		dataXNSE:(dataXNSE)
      		});
    	})
	},

	handleSubmit:function(URL)
	{
		console.log('This is handleSubmit Function',URL)

        $.ajax({
            type: "GET",
            dataType: 'json',
            url: URL,
            success: function(response){
            	//console.log('search Result',response.dataset.data)
            	var priceArr = [];
            	priceArr = response.dataset.data
            	console.log('search Result wali Array',priceArr)
            	var len = priceArr.length
            	console.log('length',len)
            	this.setState({
            		open:priceArr[len-1][1],
            		high:priceArr[len-1][2],
					low:priceArr[len-1][3],
					close:priceArr[len-1][4],
					volume:priceArr[len-1][5], 
					searchDataPrice:this.state.searchDataPrice.concat(priceArr[len-1][2])          		
            	})
            	// for(var i=0;i<priceArr.length;i++)
            	// {
            	// 	console.log('search Result wali Array',priceArr[i][2])	
            	// }

                this.setState({
                       searchResults: response
                    })
            }.bind(this)
        });

	},

	createAjax: function(query){
        //console.log('create Function')
        var query    = this.refs.query.value;
        
        this.setState({
                       searchData:this.state.searchData.concat(query)
                    })
        //console.log('Query',query)
        var URL      = 'https://www.quandl.com/api/v3/datasets/XNSE/' + query +'.json?api_key=gWf2CLShwrGUBVnqzsT4&start_date=2017-02-23&end_date=2017-08-23';
        //console.log(URL)
        this.handleSubmit(URL);
    },  

	

	render:function(){
		//console.log('searchData',this.state.searchData)
		var search5 = '-';
		var search4 = '-';
		var search3 = '-';
		var search2 = '-';
		var search1 = '-';

		var searchPrice5 = '-';
		var searchPrice4 = '-';
		var searchPrice3 = '-';
		var searchPrice2 = '-';
		var searchPrice1 = '-';

		var latestSearch = this.state.searchData;
		latestSearch=latestSearch.reverse();

		var latestSearchPrice = this.state.searchDataPrice;
		latestSearchPrice=latestSearchPrice.reverse();

		if(latestSearch.length === 1)
		{
			var search5 = latestSearch[0];
			var searchPrice5 = latestSearchPrice[0];
		}

		if(latestSearch.length === 2)
		{
			var search5 = latestSearch[0];
			var searchPrice5 = latestSearchPrice[0];
			var search4 = latestSearch[1];
			var searchPrice4 = latestSearchPrice[1];
		}

		if(latestSearch.length === 3)
		{
			var search5 = latestSearch[0];
			var searchPrice5 = latestSearchPrice[0];
			var search4 = latestSearch[1];
			var searchPrice4 = latestSearchPrice[1];
			var search3 = latestSearch[2];
			var searchPrice3 = latestSearchPrice[2];
		}

		if(latestSearch.length === 4)
		{
			var search5 = latestSearch[0];
			var searchPrice5 = latestSearchPrice[0];
			var search4 = latestSearch[1];
			var searchPrice4 = latestSearchPrice[1];
			var search3 = latestSearch[2];
			var searchPrice3 = latestSearchPrice[2];
			var search2 = latestSearch[3];
			var searchPrice2 = latestSearchPrice[3];
		}

		if(latestSearch.length === 5)
		{
			var search5 = latestSearch[0];
			var searchPrice5 = latestSearchPrice[0];
			var search4 = latestSearch[1];
			var searchPrice4 = latestSearchPrice[1];
			var search3 = latestSearch[2];
			var searchPrice3 = latestSearchPrice[2];
			var search2 = latestSearch[3];
			var searchPrice2 = latestSearchPrice[3];
			var search1 = latestSearch[4];
			var searchPrice1 = latestSearchPrice[4];
		}



		//console.log('searchData',latestSearch)
		//console.log('searchDataPrice',latestSearchPrice)

		console.log('dataXNSE',this.state.dataXNSE)
			//console.log('dataXNSE',this.state.dataXNSE.map((value) => (value.symbol)))
			var openPm = 0;
			var highPm = 0;
			var lowPm = 0;
			var closePm = 0;
			var volumePm = 0;
			if(this.state.searchResults)
			{
				console.log('search Result in render',this.state.searchResults.dataset.data)
			}
			if(this.state.open)
			{
				openPm = this.state.open
			}
			if(this.state.high)
			{
				highPm = this.state.high
			}
			if(this.state.low)
			{
				lowPm = this.state.low
			}
			if(this.state.close)
			{
				closePm = this.state.close
			}
			if(this.state.volume)
			{
				volumePm = this.state.volume
			}
			var dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
								  'Donec hendrerit tempor tellus.',
								  'Donec pretium posuere tellus.', 
								  'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 
								  'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 
								  'Nulla posuere.', 
								  'Donec vitae dolor.', 
								  'Nullam tristique diam non turpis.', 
								  'Cras placerat accumsan nulla.', 
								  'Nullam rutrum.', 
								  'Nam vestibulum accumsan nisl.'];
		return(
			<div>
	    		<Navbar inverse collapseOnSelect>
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="#">AIMSQUANT</a>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav pullRight>
				        <NavItem eventKey={1} href="#">Dashboard</NavItem>
				        <NavItem eventKey={2} href="#">Screen Advices</NavItem>
				      	<NavItem eventKey={2} href="#">Stock Research</NavItem>
				        <NavItem eventKey={2} href="#">Quant Research</NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			
				<Grid>
			    <Row className="show-grid">
				    <Col sm={18} md={9} className="show-grid ">
					    <Row className="show-grid well">
						    <Navbar>
							      <Navbar.Form pullLeft>							      
							          <input type="text" ref="query" placeholder="Search" />							        
							          <Button type="submit" onClick={this.createAjax}>Submit</Button>
							      </Navbar.Form>
							</Navbar>


					    	<Col sm={6} md={3} className="show-grid well">
						    	<h1>FB:NSE</h1>
						    	Add to wishlist
						    	<br/>
						    	<br/>
						    	<h2>12,241</h2><h4>%12.44</h4>
						    	Least Close Price
						    	<br/>
						    	<br/>	
					    	</Col>
			      			<Col sm={9} md={4} className="show-grid well">
						    	<Table>
								  <thead>
								    <tr>
								      <th>Price Metrics</th>
								      <th></th>
								    </tr>
								  </thead>
								    <tbody>
								      <tr>
								        <td>Open</td>
								        <td>${openPm}</td>
								      </tr>
								      <tr>
								        <td>High</td>
								        <td>${highPm}</td>
								      </tr>
								      <tr>
								        <td>Low</td>
								        <td>${lowPm}</td>
								      </tr>
								      <tr>
								        <td>Close</td>
								        <td>${closePm}</td>
								      </tr>
								      <tr>
								        <td>Volume</td>
								        <td>{volumePm}</td>
								      </tr>
								    </tbody>
								</Table>
					    	</Col>
					    	<Col sm={12} md={5} className="show-grid well">
						    	<Table>
								  <thead>
								    <tr>
								      <th>Performance Metrics</th>
								      <th></th>
								    </tr>
								  </thead>
								    <tbody>
								      <tr>
								        <td>Avg. Return</td>
								        <td>$1,234 +1.2%</td>
								      </tr>
								      <tr>
								        <td>Total Return</td>
								        <td>$1,234 +1.2%</td>
								      </tr>
								      <tr>
								        <td>P/L</td>
								        <td>$1,234 +1.2%</td>
								      </tr>
								      <tr>
								        <td>Sharpee</td>
								        <td>$1,234 +1.2%</td>
								      </tr>
								      <tr>
								        <td>Volatility</td>
								        <td>$1,234 +1.2%</td>
								      </tr>
								    </tbody>
								</Table>
					    	</Col>
				    	</Row>
				    	<Row className="show-grid well">
					    	<Col sm={18} md={9}><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br/>{dummySentences.slice(0, 4).join(' ')}</Col>
				    	</Row>

				    </Col>

				    <Col sm={6} md={3} className="show-grid">
				    	<Row sm={6} md={3} className="show-grid well">
				    		<h3>Recent Searches</h3>
					    	<Table striped bordered condensed hover>
							  <thead>
							    <tr>
							      <th>Symbol</th>
							      <th>Last Price</th>
							    </tr>
							  </thead>
							     <tbody>
								      <tr>
								        <td>{search5}</td>
								        <td>{searchPrice5}</td>
								      </tr>
								      <tr>
								        <td>{search4}</td>
								        <td>{searchPrice4}</td>
								      </tr>
								      <tr>
								        <td>{search3}</td>
								        <td>{searchPrice3}</td>
								      </tr>
								      <tr>
								        <td>{search2}</td>
								        <td>{searchPrice2}</td>
								      </tr>
								      <tr>
								        <td>{search1}</td>
								        <td>{searchPrice1}</td>
								      </tr>
								    </tbody>
							</Table>
				    	</Row>

				    	<Row sm={6} md={3} className="show-grid well">
				    		<h3>Watch List</h3>
					    	<Table striped bordered condensed hover>
							  <thead>
							    <tr>
							      <th>First Name</th>
							      <th>Last Name</th>
							    </tr>
							  </thead>
							    <tbody>
							      <tr>
							        <td>AMZ</td>
							        <td>$1,234 +1.2%</td>
							      </tr>
							      <tr>
							        <td>AMZ</td>
							        <td>$1,234 +1.2%</td>
							      </tr>
							      <tr>
							        <td>AMZ</td>
							        <td>$1,234 +1.2%</td>
							      </tr>
							      <tr>
							        <td>AMZ</td>
							        <td>$1,234 +1.2%</td>
							      </tr>
							      <tr>
							        <td>AMZ</td>
							        <td>$1,234 +1.2%</td>
							      </tr>
							    </tbody>
							</Table>
				    	</Row>
				    </Col>

			    </Row>
			  </Grid>
		  	</div>
			);
	}
});

ReactDOM.render(<Main />, document.getElementById('app'))
