// link to the connect package

var connect = require('connect');
var accounting = require('accounting');

//link to the url module

var url = require('url');

//create a new app using connect
var app = connect();



//create a helloworld request / response
var helloworld = function (req, res, next) {
    //set the header
    res.writeHead(200, {
        'Content-Type': 'text-plaint'

    });

    res.end('Hello World');

};

var goodbyeworld = function (req, res, next) {
    res.writeHead(200, {


    });

    res.end('Goodbye world');

};

var calculateTax = function (req, res, next) {
    // get subtotal from the url querystring
    var qs = url.parse(req.url, true).query;


    // get the sutotal from the querystring
    var subTotal = qs.subtotal;
    
    // calculate tax
    
    var tax = parseFloat(subTotal) * 0.13;
    
    // calculate total
    
    var total = parseFloat(subTotal) + tax;
    
    
    res.writeHead(200, {
       
       "Content-Type": "text-plain"
        
    });
    
    //display result
    res.write('Subtotal: ' + accounting.formatMoney(subTotal) + '\n');
    res.write('Tax: '+ accounting.formatMoney(tax) + '\n');
    res.write('Total: ' + accounting.formatMoney (total));   
    res.end();
};

var loop = function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'text-plain' });

    var i;
    for (i = 1; i <= 20; i++) {
       res.write(i + '\n');

        console.log(i);
    }

    res.end();

};

var home = function(req, res, next){
    
    res.writeHead(200, {'Content-Type': 'text-plain'});
    res.write('Home Page');
    res.end();  
};



// route each url to proper function
app.use('/hello', helloworld);
app.use('/goodbye', goodbyeworld);
app.use('/tax-calculator', calculateTax);
app.use('/loop', loop);
app.use('/', home);
//listen to the events
app.listen(3000);
console.log('Connect app running at http:// localhost:3000');