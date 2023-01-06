<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(){
        $students = Student::all();
        return $students;
    }

    public function store(Request $request){
        $students= new Student();
        $students->name= $request->name;
        $students->email= $request->email;
        $students->address= $request->address;
        $students->group= $request->group;
        $students->save();
        return ('successfully added the information');
    }

    public function update(Request $request, $id){
        $students= Student::find($id);
        $students->update($request->all());
        return response()->json('infromation updated');
    }
    
    public function destroy(Request $request, $id){
        $students= Student::find($id);
        $students->delete($request->all());
        return response()->json('deleted ');
    }
}
