const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(date).toLocaleDateString('en-GB',options);
    //const newDate = !date ? "undefined" : new (Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;   
   
   }

   const checkName=(name)=> {
    let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if(!nameRegex.test(name)) throw 'Name is Incorrect';
   }
   
   
   const update = async (node) => {
       
       let empPayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
       console.log("check id",node.id);
       let empPayrollData = await empPayrollList.find(empData => empData.id == node.id)
       console.log("check update function",empPayrollData);
       if(!empPayrollData) return;
       localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
       window.location.replace("../pages/EmployeePayrollApp.html");
   }

   
   const checkStartDate=(startDate)=>{
        let now =new Date();
        if(startDate>now) throw 'Start Date is a Future Date!';
        var diff=Math.abs(now.getTime()-startDate.getTime());
        if(diff/(1000*60*60*24)>30)
        {
            throw 'Start Date is beyond 30 Days!';
        }
}