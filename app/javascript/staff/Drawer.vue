<template lang='pug'>
   q-drawer(
     show-if-above
     content-class="bg-grey-1"
   )
     q-list(padding)
       q-item(clickable :to="{ name: 'clients' }")
         q-item-section Клиенты
       q-item(clickable :to="{ name: 'organisations' }")
         q-item-section Организации
       q-item(clickable :to="{ name: 'staffs' }")
         q-item-section Сотрудники
 </template>

<script>
  export default {};
</script>