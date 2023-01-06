<template>
<div>


<div class="py-4 px-2 w-75 mt-5 mb-5 shadow-md sm:rounded-lg">
<form @submit.prevent="save" class="max-w-sm" >
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Name
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text"  v-model="state.students.name">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Email
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text"  v-model="state.students.email">
    </div>
  </div>

  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Address
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text"   v-model="state.students.address">
    </div>
  </div>
  <div class="md:flex md:items-center mb-6">
    <div class="md:w-1/3">
      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
        Group
      </label>
    </div>
    <div class="md:w-2/3">
      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" v-model="state.students.group">
    </div>
  </div>


  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class=" w-full shadow-lg bg-purple-500 hover:bg-purple-600 focus:shadow-outline focus:outline-none  text-white font-bold py-2 px-4 rounded" type="submit">
        Save
      </button>
    </div>
  </div>
</form>
</div>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <div class="text-gray-500 text-lg font-bold md:text-center p-4 mb-1 md:mb-0 "> Student list</div>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-md text-white font-bold uppercase bg-purple-500 dark:bg-gray-700 dark:text-gray-400 shadow-md">
            <tr>
                <th scope="col" class="py-3 px-6">
                    ID
                </th>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Email
                </th>
                <th scope="col" class="py-3 px-6">
                    Address
                </th>
                <th scope="col" class="py-3 px-6">
                    Group
                </th>
                <th scope="col" class="py-3 px-6">
                    Action 
                </th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="(student, index) in state.students" v-bind:key="student.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900  dark:text-white">
                    {{index+1}}
                </th>
                <td class="py-4 px-6">
                    {{student.name}}
                </td>
                <td class="py-4 px-6">
                    {{student.email}}
                </td>
                <td class="py-4 px-6">
                   {{student.address}}
                </td>
                <td class="py-4 px-6">
                   {{student.group}}
                </td>
                <td class="py-4 px-6 ">
                    <button class="pr-4" @click="edit(student)">Edit</button>
                    <button class="pr-4 " @click="remove(student.id)">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</div>


</template>
<script setup>
import axios from "@/services/axios";
import {reactive, onMounted} from 'vue';
const state= reactive({
    students :{
        id:'',
        name :'',
        email :'',
        address :'',
        group:''
    }   
})

//showing item
async function StudentLoad(){
    let result = await axios.get('/students');
    console.log(result);
    state.students = result.data;
}
onMounted(()=>{
    StudentLoad();
});
//Adding item
async function add(){
  let result = await axios.post('/save',{

    name: state.students.name,
    address: state.students.address,
    email: state.students.email,
    group: state.students.group,
  });
  StudentLoad();
};

function save(){
  if(state.students.id == null){
    add();
  }

  else{
    update();
  }
}

//deleting item

async function remove(id){
  let result = await axios.delete("/delete/"+id)
  StudentLoad();
}


//updating item

async function update(){
  let editdata = await axios.put("/edit/"+state.students.id, {
    name: state.students.name,
    address: state.students.address,
    email: state.students.email,
    group: state.students.group,
    
  });
  StudentLoad();
}

function edit(student){
  state.students.name= student.name;
  state.students.email= student.email;
  state.students.address= student.address;
  state.students.group= student.group;
  state.students.id = student.id;

}



</script>
<style scoped>

</style>
