const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" : new Date(date).toLocaleDateString('en-GB',options);
    //const newDate = !date ? "undefined" : new (Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;   
   
   }
   
   
   
   const update = (node) => {
       let empPayrollData = empPayrollList.find(empData => empData._id == node.id)
       if(!empPayrollData) return;
       localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
       window.location.replace("../pages/EmployeePayrollApp.html");
   }
