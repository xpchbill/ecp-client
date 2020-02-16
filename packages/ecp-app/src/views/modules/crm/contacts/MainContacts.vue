<template>
  <div>getMainContacts</div>
</template>

<script>
import crmAPI from '@/api/crm';

crmAPI.getMainContacts();

export default {
  name: 'MainContacts',
  data() {
    return {};
  }
};
</script>
