// Task1: initiate app and run server at 3000

const express=require('express');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));






const path=require('path');
 app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


// Task2: create mongoDB connection 

const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://deepthikc4:kunjulakshmi@cluster0.bctrkn7.mongodb.net/employeeDB')

const Schema=mongoose.Schema;
const employeeSchema=new Schema({
    id:Number,   
    name:String,
    position:String,
    salary:Number,
    location:String      
    

});

const EmployeeData=mongoose.model('employees',employeeSchema);


     
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below



//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try {
        
        
        const data=await EmployeeData.find();           
            res.status(200).send(data);
        
    } catch (error) {
        res.status(404).send(`no data found`);
    }     
   
})



// app.get('/api/employeelist',(req,res)=>{

//     EmployeeData.find()
//     .then(employee=>res.json(employee))
//     .catch(err=>res.json(err))

// })





//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id',(req,res)=>{

    try {
        console.log(`displayed id number ${req.params.id}  data successfully`);
        const query={"id":req.params.id};
        EmployeeData.findOne(query).then((data)=>{
            console.log(data);
        res.status(200).send(data);
        
        // res.send({message:"this is the data ",data});
        })
    } catch (error) {
        res.status(404).send(`no data found`);
    }
  

})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',(req,res)=>{

   


    try {
        var employeedata=new EmployeeData({

            name:req.body.name,
            location:req.body.location,
            position:req.body.position,
            salary:req.body.salary
        })
        console.log(employeedata);
        employeedata.save();
        res.status(201).json({Success:true});
    } catch (error) {
        res.send(`can not insert data`,{error});
    }
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'


app.delete('/api/employeelist/:id',(req,res)=>{

    try {
        EmployeeData.deleteOne({id:req.body.id}).then((data)=>{
    
            res.send(data);
        })
    } catch (error) {
        res.status(400).json({err:error});
    }
    
    
    })







//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}




app.put('/api/employeelist',(req,res)=>{
    try {
        const query={"name":req.body.name};
    EmployeeData.findOne(query).then((employeedata)=>{
        console.log(employeedata);
        employeedata.name=req.body.name;
        employeedata.location=req.body.location;
        employeedata.position=req.body.position;
        employeedata.salary=req.body.salary;
  
        employeedata.save();  })
        
    console.log(" updated");
    res.status(201).json({Success:true,message:"Data Updated Successfully"})
        
    
    
    } catch (error) {
        res.status(400).json({err:error});
    }
    
    
    })










                





//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


app.listen(3000,()=>{
    console.log(`server started`);
})
