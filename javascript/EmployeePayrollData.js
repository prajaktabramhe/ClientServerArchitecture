class EmployeePayrollData 
{

//getter and setter method
 id;

get name() 
{
      return this._name;
}
set name(name)

{
      let nameRegex = RegExp("^[A-Z]{1}[a-z]{2,}$");
       
      if (nameRegex.test(name)) 
        this._name = name;
      else throw "Name is incorrect";
} 
get profillePic()
{
  return this._profilePic;
}
set profillePic(profillePic)
{
  this._profilePic = profillePic;
}
get geneder()
{
  return this._gender;
}
set gender(gender)
{
  this._gender = gender;
}
get department()
{
  return this._department;
}
set department(department)
{
this._department = department;
}
get salary()
{
  return this._salary;
}
set salary(salary)
{
  this._salary = salary;
}
get note() 
{
    return this._note;
}
set note(note) 
{
    this._note = note;
}

get startDate() 
{
    return this._startDate;
}

set startDate(startDate) 
{
  let now = new Date();
  if (startDate > now) throw 'Start Date is a Future Date!'
     var diff = Math.abs(now.getTime() - startDate.getTime());
  if (diff / (1000 * 60 * 60 * 24) > 30)
     throw 'start Date is beyond 30 Days!';
  this._startDate = startDate;
}


   //method
  toString()
  {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        //if start date is not in the given datatype it will pass the value undefined to empdate
        
        const empDate = !this._startDate ? "undefined" : this._startDate;
        //here in return for start date we are passing empDate as value                
        return "id=" + this._id + ", name=" + this._name + " gender= " +this._gender+ " profilePic= "+this.profilePic + " department= "+this._department + " salary= "+ this._salary+ " Note= "+this._note +  " startDate =" + empDate;
  }
}

