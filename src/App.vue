<template>
  <div class="add">
    <label for="newName" :class="testName(newContact.newName) || !newContact.newName ? '' : 'attention'">Ім'я:</label>
    <input name="newName" type="text" v-model="newContact.newName">
    <label for="newPhone" :class="testPhone(newContact.newPhone) ? '' : 'attention'">Номер телефону:</label>
    <input name="newPhone" type="text" v-model="newContact.newPhone">
    <button class="add__btn" @click="addContact" :disabled="!testName(newContact.newName) || !testPhone(newContact.newPhone)">Додати контакт</button>
  </div>
  <ul class="contacts">
    <li v-if="contacts.length == 0">У списку ще немає контактів.</li>
    <li class="contacts__item contact" v-for="(item, i) in contacts" :key="i">
      <span class="contact__i">{{i+1}}</span>
      <div class="contact__block block" :class="contacts[i].editName ? 'editing' : ''">
        <label :for="'name_'+i">{{item.name}}</label>
        <input :name="'name_'+i" type="text" v-model="item.name">
      </div>
      <button class="btn-style" @click="editName(i)" :class="!testName(item.name) ? 'attention' : ''" :disabled="!testName(item.name)">
        <fa-icon icon="user-edit"></fa-icon>
      </button>
      <div class="contact__block block" :class="contacts[i].editPhone ? 'editing' : ''">
        <label :for="'phone'+i">{{item.phone ? item.phone : 'Без номеру телефона'}}</label>
        <input :name="'phone'+i" type="text" v-model="item.phone">
      </div>
      <button class="btn-style" @click="editPhone(i)" :class="testPhone(item.phone) ? '' : 'attention'" :disabled="!testPhone(item.phone)">
        <fa-icon icon="edit"></fa-icon>
      </button>
      <button class="btn-style" @click="deletePhone(i)" :disabled="contacts[i].phone ? false : true">
        <fa-icon icon="phone-slash"></fa-icon>
      </button>
      <button class="btn-style" @click="deleteContact(i)">
        <fa-icon icon="user-minus"></fa-icon>
      </button>
    </li>
  </ul>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { FontAwesomeIcon as FaIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'App',
  components: {
    HelloWorld, FaIcon
  },
  data(){
    return{
      newContact: {
        newName: '',
        newPhone: ''
      },
      contacts: [
        // {
        //   name: 'Назар',
        //   phone: '380981234567',
        //   editName: false,
        //   editPhone: false
        // },
        // {
        //   name: 'Назар',
        //   phone: '',
        //   editName: false,
        //   editPhone: false
        // },
        // {
        //   name: 'Назар',
        //   phone: '380987654321',
        //   editName: false,
        //   editPhone: false
        // }
      ],
      validNumber: /^\d[\d\(\)\ -]{4,14}\d$/,
      validName: /^.{3,}$/
    }
  },
  methods: {
    addContact(){
      this.contacts.push({
        name: this.newContact.newName,
        phone: this.newContact.newPhone,
        editName: false,
        editPhone: false
      });
      this.newContact.newName = '';
      this.newContact.newPhone = '';
    },
    deleteContact(i){
      this.contacts.splice(i, 1);
    },
    deletePhone(i){
      this.contacts[i].phone = '';
      this.contacts[i].editPhone = false;
    },
    editName(i){
      this.contacts[i].editName = !this.contacts[i].editName;
    },
    editPhone(i){
      this.contacts[i].editPhone = !this.contacts[i].editPhone;
    },
    testName(value){
      if(this.validName.test(value)){
        return true
      } else {
        return false
      }
    },
    testPhone(value){
      if(this.validNumber.test(value) || !value){
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap');
body {
  margin: 0;
  padding: 0;
  color: #262626;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-block;
}
.add {
  width: 800px;
  padding: 20px 0;
  color: #FFFFFF;
  background-color: #587373;
  border-radius: 16px 16px 0 0;
  text-align: center;
  margin-top: 20px;
  label {
    margin-right: 5px;
    &.attention {
      color: red;
    }
  }
  input {
    color: #FFFFFF;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    font-weight: 400;
    background: rgba(1, 31, 38, 0.15);
    border: none;
    padding: 5px 16px;
    box-sizing: border-box;
    border-radius: 16px;
    transition: all 0.5s ease-out;
    margin-right: 20px;
    &:focus {
      outline: none;
    }
  }
  &__btn {
    color: #FFFFFF;
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    padding: 6px 16px;
    background: rgba(1, 31, 38, 0.15);
    transition: all 0.5s ease-out;
    border: none;
    border-radius: 16px;
    &:hover:enabled {
      background: #F2F2F2;
      color: rgba(1, 31, 38, 1);
      cursor: pointer;
    }
    &:disabled {
      cursor: auto;
      opacity: 0.25;
    }
  }
}
.contacts {
  width: 800px;
  background-color: #F2F2F2;
  border-radius: 0 0 16px 16px;
  text-align: left;
  margin-top: 2px;
  padding: 30px;
  box-sizing: border-box;
	&__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    border-bottom: solid 1px #587373;
    &:last-child {
      border-bottom: none;
    }
  }
}
.contact {
	&__i {
    font-size: 12px;
    margin-right: 20px;
  }
	&__block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    width: 250px;
    height: 100%;
    overflow: hidden;
    input {
      position: absolute;
      color: #262626;
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      font-weight: 400;
      background: transparent;
      width: 100%;
      border: none;
      padding: 5px 16px;
      box-sizing: border-box;
      border-radius: 16px;
      transition: all 0.5s ease-out;
      visibility: hidden;
      &:focus {
        outline: none;
      }
    }
    label {
      padding-left: 16px;
    }
    &.editing {
      input {
        visibility: visible;
        background: rgba(1, 31, 38, 0.15);
      }
      label {
        visibility: hidden;
      }
    }
  }
}
.btn-style {
  margin: 0 10px;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 18px;
  background-color: transparent;
  color: #587373;
  transition: all 0.3s ease-out;
  &:hover:enabled {
    background-color: #587373;
    color: #F2F2F2;
  }
  &:disabled {
    cursor: auto;
    color: rgba(88, 115, 115, 0.2);
  }
  &.attention {
    background-color: rgba(255, 0, 0, 0.2);
    color: #F2F2F2;
  }
}


#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;*/
}
</style>
